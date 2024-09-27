
# AWS Lambda

This project fetches data from Kinesis and stores it in PostgreSQL

## Code Structure

The project structure is as follows:

- `Config`: Configuration for environment variables.
- `db`: Functionality associated with the DB.
- `models`: Models of fetched data.

## Installation

To install the project dependencies, follow these steps:

1. Make sure you have Node.js installed on your system.
2. Open a terminal or command prompt in your project directory.
3. Run the following command to install the dependencies:

```bash
npm install
```
4. Create the table in the database by running the following commands in the relevant container

```bash
psql -U your-user-name -d your-database
```
Now you should run the exact command found in [Table](src/utils/createTable.sql) in order to create it

5. Set the following environment variables
   with your values

```bash
DATABASE_SECRET_KEY = "your-secret-key"
TABLE_NAME = "your-table-name" // the name of the table you created
```
