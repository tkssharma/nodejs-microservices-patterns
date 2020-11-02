import { DynamoDB } from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient({
    region: process.env.REGION
});

export const deleteItem = async (event) => {

    try {
        const { pathParameters: { id } } = event;
        const params = {
            TableName: process.env.TABLE_NAME,
            Key: { id }
        };
        await documentClient.delete(params).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'success deleted !'
                },
                null,
                2
            )
        }
        return response;
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        };
    }


}