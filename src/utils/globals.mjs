import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';

export const globals = {
  uuid: uuid(),
  dynamoDB: new AWS.DynamoDB.DocumentClient(),
  itemTableName: "itemsTable"
}