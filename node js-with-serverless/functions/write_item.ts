import {DynamoDB} from 'aws-sdk';
import { eventData, dbItem } from '../models/table_schema';
import { dynamoParams } from '../shared/create_dynamo';

const documentClient = new DynamoDB.DocumentClient({
    region:process.env.REGION
});

export const writeItem = async(event)=> {
try{
    const insertData:eventData =JSON.parse(event.body) 
    const dbInsertItem:dbItem = dynamoParams(insertData);
    await documentClient.put(dbInsertItem).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'success inserted !'
          },
          null,
          2
        )
    }
    return response;
}catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
  }