import {eventData, dbItem, schema} from '../models/table_schema'

export const dynamoUpdatedParams= (Item:eventData, id:string)=>{
const item:schema={id:id,...Item}
const dynamoTableItem:dbItem = {
        TableName:process.env.TABLE_NAME,
        Item:item
}
return dynamoTableItem;
}