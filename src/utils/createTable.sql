CREATE TABLE Message (
    id SERIAL PRIMARY KEY,
    MessageType VARCHAR(255) NOT NULL,
    Timestamp TIMESTAMP NOT NULL,
    ForwardCsms VARCHAR(255) NOT NULL,
    ChargerIdentifier VARCHAR(255) NOT NULL,
    TenantId VARCHAR(255) NOT NULL,
    SaiflowMessageId VARCHAR(255) NOT NULL,
    IpAddr VARCHAR(45) NOT NULL, -- Accommodates IPv6
    DstIpAddr VARCHAR(45) NOT NULL, -- Accommodates IPv6
    SrcAsset VARCHAR(255) NOT NULL,
    Port VARCHAR(10) NOT NULL,
    ConId VARCHAR(255) NOT NULL,
    InitiatedByGw BOOLEAN NOT NULL,
    OcppAcceptedVersion VARCHAR(10) NOT NULL,
    Payload JSONB NOT NULL -- Using JSONB for complex Payload structure
);