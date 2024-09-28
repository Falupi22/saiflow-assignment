import { Pool } from "pg";
import AWS from 'aws-sdk';
import fetch from 'node-fetch'
import { Credentials } from "../models";
import { Config } from "../config";

/**
 * Fetches the secret value from AWS Secrets Manager using the provided secret ID
 * @returns The secret value as a JSON object
 */
const getSecretValue = async () => {
    const secretResponse = await fetch(`http://host.docker.internal:${Config.secret_service_port}`);
    const secretJSON: AWS.SecretsManager.GetSecretValueResponse = await secretResponse.json() as AWS.SecretsManager.GetSecretValueResponse;;

    return JSON.parse(secretJSON.SecretString || '{}');
};

/**
 * Creates a new PostgreSQL connection pool by using the secret provided from AWS
 * @returns An instance of PostgreSQL pool
 */
const getConnectionPool = async (): Promise<Pool> => {
    try {
        const credentials: Credentials = await getSecretValue();
        const pool = new Pool({
            user: credentials.username,
            // The only way to make it work.
            host: "host.docker.internal",
            database: credentials.dbname,
            password: credentials.password,
            port: credentials.port,
        });

        return pool;
    }
    catch (error) {
        throw error
    }
}

export default getConnectionPool;