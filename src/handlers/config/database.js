const dynamodb = require('aws-sdk/clients/dynamodb');
const tableName = process.env.SAMPLE_TABLE;
const docClient = new dynamodb.DocumentClient();

const db = {
    tableName,
    docClient
}

export default db;