import db from "./config/database";

exports.updateById = (event)=>{
    if (event.httpMethod !== 'PUT') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }
    try {


        
    } catch (ResourceNotFoundException) {
        response = {
            statusCode: 404,
            body: "Unable to call DynamoDB. Table resource not found."
        };
    }

      console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
      return response;
}