import { PoolClient, QueryResult } from "pg";
import { Message } from "../models";
import { createTable as createTableScript, wrap, wrapValue } from "../utils";
import { Config } from "../config";

/**
 * Inserts the given message into the database
 * @param message The message to be inserted
 * @param client The client to communicate with the database
 * @returns A Promise that resolves to the query result
 */
const insertData = (message: Message, client: PoolClient): Promise<QueryResult<unknown>> => {
    const initiatedByGw = message.Data.InitiatedByGw ?? null;
    const authorization = wrapValue(message.Data.Authorization);
    const payload = wrapValue(message.Data.Payload);
    const dstIpAddr = wrap(message.DstIpAddr) ?? null;
    const ocppAcceptedVersion = wrapValue(message.Data.OcppAcceptedVersion);
    const port = message.Port && message.Port !== '' ? parseInt(message.Port) : null;

    const query: string = `INSERT INTO ${Config.table_name} (
                           messagetype, timeanddate, forwardcsms, chargeridentifier,
                           tenantid, saiflowmessageid, ipaddr, dstipaddr,
                           srcasset, port, conid, initiatedbygw, payload, auth, 
                           ocppacceptedversion
                           ) VALUES (
                           '${message.MessageType}',
                           '${message.Timestamp}',
                           '${message.ForwardCsms}',
                           '${message.ChargerIdentifier}',
                           '${message.TenantId}',
                           '${message.SaiflowMessageId}',
                           '${message.IpAddr}',
                            ${dstIpAddr},
                           '${message.SrcAsset}',
                            ${port},
                           '${message.ConId}',
                            ${initiatedByGw},
                            ${payload},
                            ${authorization},
                            ${ocppAcceptedVersion}
                            );`;

    // Return the constructed query
    return client.query(query);;
}

/**
 * Recreats the table if it does not exist in the database
 * @param client The client to communicate with the database
 * @returns A Promise that resolves to the query result
 */
const recreatIfTableDoesNotExists = async (client: PoolClient): Promise<void> => {
    const query: string = `SELECT EXISTS (
            SELECT 1 
            FROM information_schema.tables 
            WHERE table_name = $1
        ) AS table_exists;`

    const result: QueryResult<{ table_exists: boolean }> = await client.query(query, [Config.table_name]);

    if (!result.rows?.[0]?.table_exists ?? false) {
        await client.query(createTableScript());
    }
}

export { insertData, recreatIfTableDoesNotExists }

