export interface eventData {
    title: string,
    description:string,
    compl_time:string,
    creat_time:string
}

export interface schema extends eventData{
      id:string
}

export interface dbItem {
    TableName:string,
    Item:schema
}