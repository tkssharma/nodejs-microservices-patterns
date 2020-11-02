import {DynamoDB} from 'aws-sdk';
import { eventData, dbItem } from '../models/table_schema';
import { dynamoUpdatedParams } from '../shared/update_dynamo';

const documentClient = new DynamoDB.DocumentClient({
    region:process.env.REGION
});

export const editItem = async(event)=> {
  try {
    const {pathParameters: { id } } = event;
    const eventItem:eventData =JSON.parse(event.body) 
    const dbUpdateItem:dbItem = dynamoUpdatedParams(eventItem,id);
    await documentClient.put(dbUpdateItem).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'success updated !'
        })
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }


  }