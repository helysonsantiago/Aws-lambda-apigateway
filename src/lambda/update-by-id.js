const db = require("../config/database");

exports.updateByIdHandler = async (event)  =>{
    if (event.httpMethod !== 'PUT') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    console.info('received:', event);

    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);

    let response = {};

    try {

    const params ={
        TableName : db.tableName,
        Key : { id: id},
        UpdateExpression: "set #name = :name",
        ExpressionAttributeNames:{
            "#name":"name"
        },
        ExpressionAttributeValues:{
            ":name": body.name
        },
        ConditionExpression: "attribute_exists(id)",
        ReturnValues: "UPDATED_NEW"
    };

    const data = await db.docClient.update(params).promise()

    response = {
        statusCode: 200,
        body: JSON.stringify(data.Attributes)
    }
        
    } catch (error) {
        response = {
            statusCode: 500,
            body: "Unable to update item. Error: " + error.message
        };
    }

      console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
      return response;
}