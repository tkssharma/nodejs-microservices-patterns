import {DynamoDB} from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient({
    region:process.env.REGION
});

export const readSingleItem = async(event)=> {
  const {pathParameters: { id } } = event;
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {id}
  };
  try {
    const data = await documentClient.get(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item? data.Item:{message:'Item not found'})
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }


  }