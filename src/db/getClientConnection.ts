import { Client } from "pg";
import AWS from 'aws-sdk';
import { Config } from "../config";

const secretsManager = new AWS.SecretsManager();

/**
 * Fetches the secret value from AWS Secrets Manager using the provided secret ID
 * @returns The secret value as a JSON object
 */
const getSecretValue = async () => {
    const secret = await secretsManager.getSecretValue({ SecretId: Config.db_credentials_secret }).promise();
    return JSON.parse(secret.SecretString || '{}');
};

/**
 * Creates a new PostgreSQL client by using the secret provided from AWS
 * @returns An instance of PostgreSQL client
 */
const getClientConnection = async (): Promise<Client> => {
    const credentials = await getSecretValue();

    const client = new Client({
        user: credentials.username,
        host: credentials.host,
        database: credentials.dbname,
        password: credentials.password,
        port: credentials.port,
    });

    return client;
}

export default getClientConnection;