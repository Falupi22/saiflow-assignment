import { KinesisStreamEvent } from "aws-lambda";
import { KinesisStreamHandler } from 'aws-lambda';
import { PoolClient, Pool, QueryResult } from 'pg';
import { insertData, getConnectionPool } from "./db";
import { recreatIfTableDoesNotExists } from "./db/queryHandler";
import { Message } from "./models";
import { log } from "console";

const SAVE_TO_DB_DELAY_IN_MILLISECONDS = 10 * 60 * 1000;

// Average total after 10 minutes should be 50000, set to one for easy testing
const MAX_MESSAGE_COUNT_IN_CACHE: number = 1;

// Caching messages with timestamp of storage, so we can know which to store
const messageCache: Array<Message> = [];

// Initialize Secrets Manager
let pool: Pool;
let interval: NodeJS.Timeout;
;
export const handler: KinesisStreamHandler = async (event: KinesisStreamEvent) => {
  try {
    if (!interval) {
      interval = setInterval(insertAll, SAVE_TO_DB_DELAY_IN_MILLISECONDS)
    }

    // Store the messages in the cache, reducing overhead
    event?.Records?.forEach(record => {
      // Decode base64 encoded data from Kinesis
      const payload: string = Buffer.from(record.kinesis.data, 'base64').toString('utf-8');
      const message = JSON.parse(payload);

      // Add the message to the cache
      messageCache.push(message);
    });

    if (messageCache.length >= MAX_MESSAGE_COUNT_IN_CACHE) {
      clearInterval(interval);
      interval = null;

      // This operation might take time so the interval is cleared
      await insertAll();

      interval = setInterval(insertAll, SAVE_TO_DB_DELAY_IN_MILLISECONDS)
    }
  }
  catch (error) {
    clearInterval(interval);
    interval = null;

    log('Error occurred while processing events data: ', error)
  }
};

const insertAll = async () => {
  let client: PoolClient;
  try {
    // Check if there is already a connection to the database
    if (!pool) {
      pool = await getConnectionPool();
      client = await pool.connect();

      // Create the table if it doesn't exist.
      // I added it because in the image of the 
      // DB there was not any table exists in the DB.
      await recreatIfTableDoesNotExists(client);
    }
    else {
      // No need to check if the table exists because it is not the first time this
      // handler is called
      client = await pool.connect();
    }

    // Process each record from the cache because 10 minutes have passed or there
    // Store all the queries of each record
    const queries: Array<Promise<QueryResult<unknown>>> = messageCache.map(message => {
      return insertData(message, client);
    });

    // Actually stores each record from the Kinesis stream
    if (queries) {
      await Promise.all(queries);
    }

    messageCache.length = 0;
  }
  catch (error) {
    log('Error occurred while storing data in the DB: ', error)
  }
  finally {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    if (client) {
      await client.release();
      client = null;
    }
  }
}