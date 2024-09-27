import { KinesisStreamEvent } from "aws-lambda";
import { KinesisStreamHandler } from 'aws-lambda';
import { Client, QueryResult } from 'pg';
import { buildInsertQuery, getClientConnection } from "./db";

// Initialize Secrets Manager
let client: Client;

export const handler: KinesisStreamHandler = async (event: KinesisStreamEvent) => {
  try {
    // Check if there is already a connection to the database
    if (!client) {
      client = await getClientConnection()
    }

    client.connect();

    // Store all the queries of each record
    const queries: Array<Promise<QueryResult<unknown>>> = event?.Records?.map(record => {
      // Decode base64 encoded data from Kinesis
      const payload: string = Buffer.from(record.kinesis.data, 'base64').toString('utf-8');
      const message = JSON.parse(payload);

      // Insert parsed data into Postgres
      const query = buildInsertQuery(message);
      return client.query(query);
    });

    // Process each record from the Kinesis stream
    if (queries) {
      await Promise.all(queries);
    }

    await client.end();
  }
  catch (error) {
    console.error('Error processing event:', error);
  }
  finally {
    await client.end();
  }
};