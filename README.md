
# AWS Lambda

This project fetches data from Kinesis and stores it in PostgreSQL


## Table of Contents

- [Code Structure](#code-structure)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Testing](#testing)

## Code Structure

The project structure is as follows:

- `Config`: Configuration for environment variables.
- `db`: Functionality associated with the DB.
- `models`: Models of fetched data.
- `utils`: Methods for general use.
- `scripts`: Scripts for variety of uses.

## Installation

To install the project dependencies and try it, follow these steps:

1. Make sure you have Node.js installed on your system.
2. Open a terminal or command prompt in your project directory.
3. Run the following command to install the dependencies:
```bash
npm install 
```
or
```bash
pnpm i
```
In case you used only npm install and it shows an error about a lost modules file, use ``pnpm i`` too.

## Getting Started

1. Set the following environment variables
   with your values in the template.yaml, right below 'Tracing'

2. Install SAM

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html#install-sam-cli-instructions

3. Set mock creds for SAM inside the execution terminal

For Linux / MacOS

```
export AWS_ACCESS_KEY_ID=mock
export AWS_SECRET_ACCESS_KEY=mock
```

For Windows

```
set AWS_ACCESS_KEY_ID=mock
set AWS_SECRET_ACCESS_KEY=mock
```

4. Run lambda inside the execution terminal

For Linux / MacOS

`pnpm nx run lambda-exercise:serve`

For Windows

`pnpm nx run lambda-exercise:serve:windows`

5. Set up the Postgres database & the local AWS Secrets Manager
`docker compose up`

6. (Optional) Create a [NX Config](./nx.json) file in order to decrease the timeout of the Runner in case of an error and set the timeout according to it, with your values.


```bash
Environment:
        Variables:
          TABLE_NAME: your_table_name
          DATABASE_SECRET_KEY: your_database_secret
```

## Testing

If you wish to test the performance of the lambda, you 
should use the [Large Mock File](./events/manyOcpp.json), which contains 365 records to process in one time!

In the [Project File](./project.json), modify all the instances of ``./events/OcppMessages.event.json`` to
``./events/manyOcpp.event.json`` or to your own mock file.

