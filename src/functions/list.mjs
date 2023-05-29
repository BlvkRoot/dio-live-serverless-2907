import { globals } from "../utils/globals.mjs";

export const handler = async (_) => {
  try {
    const items = await globals.dynamoDB
      .scan({ TableName: globals.itemTableName })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch ({ message }) {
    return {
      statusCode: 400,
      body: JSON.stringify(message),
    };
  }
};
