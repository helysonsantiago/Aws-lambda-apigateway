const db = require("../config/database");
exports.deleteByIdHandler = async (event)=>{
    if (event.httpMethod !== 'DELETE') {
        throw new Error(`deleteMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`);
    }

    const id = event.pathParameters.id;

    const params = {
        TableName: db.tableName,
        Key: {
            id: id
        }
    };

    let response = {};
    
    try {

        await db.docClient.delete(params).promise();

        response = {
            statusCode: 200,
            body: JSON.stringify({message: `Item com id: ${id} deletado com sucesso!`})
        };
        
    } catch (error) {
        console.error("Não foi possível deletar o item", error);
        response = {
            statusCode: 500,
            body: "Não foi possível deletar o item"
        };
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}