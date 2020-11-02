import {DynamoDB} from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient({
    region:process.env.REGION
});

export const readAll = async(event)=> {
  const params = {
    TableName: process.env.TABLE_NAME
  };
  try {
    const data = await documentClient.scan(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }


  }