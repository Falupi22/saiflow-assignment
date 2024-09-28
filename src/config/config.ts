export const Config = {
    // In the project there is no actual use for that, it is here only for mimicking
    // the behavior of AWS.
    db_credentials_secret: process.env.DATABASE_SECRET_KEY ?? "your_key",
    table_name: process.env.TABLE_NAME ?? "message",
    secret_service_port: process.env.SECRET_SERVICE_PORT ?? 7000
}