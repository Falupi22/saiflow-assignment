interface Message {
    messageType: string;
    timestamp: string;
    forwardCsms: string;
    chargerIdentifier: string;
    tenantId: string;
    saiflowMessageId: string;
    ipAddr: string;
    dstIpAddr: string;
    srcAsset: string;
    port: string;
    conId: string;
    data: Data;
}

interface Data {
    initiatedByGw: boolean;
    payload: (number | string | PayloadData)[];
    ocppAcceptedVersion: string;
}

interface PayloadData {
    currentTime: string;
}

export default Message