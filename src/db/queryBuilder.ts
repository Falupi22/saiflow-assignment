import { Config } from "../config";
import { Message } from "../models";

const buildInsertQuery = (message: Message): string => {
    // Generate the query string
    const query: string = `INSERT INTO ${Config.table_name} (
        message_type, timestamp, forward_csms, charger_identifier,
        tenant_id, saiflow_message_id, ip_addr, dst_ip_addr,
        src_asset, port, con_id, initiated_by_gw, payload, ocpp_accepted_version
      ) VALUES (${message.messageType}, ${message.timestamp}, ${message.forwardCsms}, 
       ${message.chargerIdentifier}, ${message.tenantId}, ${message.saiflowMessageId}, 
       ${message.ipAddr}, ${message.dstIpAddr}, ${message.srcAsset}, ${message.port},
        ${message.conId}, ${message.data.initiatedByGw}, ${message.data.payload}, 
        ${message.data.ocppAcceptedVersion})`;

    // Return the constructed query
    return query;
}

export { buildInsertQuery }

