import {eventData, dbItem, schema} from '../models/table_schema'
import {randomBytes} from 'crypto';

export const dynamoParams= (Item:eventData)=>{
const UUID = randomBytes(16).toString("hex");
const item:schema={id:UUID,...Item}
const dynamoTableItem:dbItem = {
        TableName:process.env.TABLE_NAME,
        Item:item
}
return dynamoTableItem;
}