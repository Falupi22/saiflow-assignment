interface Message {
    MessageType: string;
    Timestamp: string;
    ForwardCsms: string;
    ChargerIdentifier: string;
    TenantId: string;
    SaiflowMessageId: string;
    IpAddr: string;
    DstIpAddr: string;
    SrcAsset: string;
    Port: string;
    ConId: string;
    Data: Data;
}

interface Data {
    InitiatedByGw: boolean | null;
    Payload: (number | string | PayloadData)[] | null;
    Authorization: Authorization | null;
    OcppAcceptedVersion: string | null;
}

interface PayloadData {
    CurrentTime: string;
}

interface Authorization {
    OverTls: boolean;
    Basic: boolean;
    ClientCert: boolean;
    Successful: boolean;
    ErrorMessage: string;
}

export default Message