const createTable = () => `CREATE TABLE Message (
    id SERIAL PRIMARY KEY,
    MessageType VARCHAR(255) NOT NULL,
    TimeAndDate TIMESTAMP NOT NULL,
    ForwardCsms VARCHAR(255) NOT NULL,
    ChargerIdentifier VARCHAR(255) NOT NULL,
    TenantId VARCHAR(255) NOT NULL,
    SaiflowMessageId UUID NOT NULL,
    IpAddr INET NOT NULL,
    DstIpAddr INET NULL,
    SrcAsset VARCHAR(255) NOT NULL,
    Port SMALLINT NULL,
    ConId UUID NOT NULL,
    InitiatedByGw BOOLEAN NULL,
    Auth JSON NULL,
    OcppAcceptedVersion VARCHAR(10) NULL,
    Payload TEXT NULL
);`

export default createTable