const db = require("../config/database");
/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and name from the body of the request
    const body = JSON.parse(event.body);
    const id = body.id;
    const name = body.name;

    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    let response = {};

    try {
        const params = {
            TableName : db.tableName,
            Item: { id : id, name: name }
        };
    
        const result = await db.docClient.put(params).promise();
    
        response = {
            statusCode: 200,
            body: JSON.stringify(body)
        };
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to call DynamoDB. Table resource not found."
        };
    }

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
