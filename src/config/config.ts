import { config } from "dotenv"

config({ path: "./.env" })

export const Config = {
    db_credentials_secret: process.env.DATABASE_SECRET_KEY,
    table_name: process.env.TABLE_NAME
}
