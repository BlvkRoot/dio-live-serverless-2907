import { globals } from "../utils/globals.mjs";

export const handler = async (event) => {
  try {
    const item = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = globals.uuid;

    const newItem = {
      id,
      item,
      createdAt,
      itemStatus: false,
    };

    await globals.dynamoDB
      .put({
        TableName: globals.itemTableName,
        Item: newItem,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newItem),
    };
  } catch ({ message }) {
    return {
      statusCode: 400,
      body: JSON.stringify(message),
    };
  }
};
