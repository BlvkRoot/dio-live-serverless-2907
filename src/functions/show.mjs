import { globals } from "../utils/globals.mjs";

export const handler = async (event) => {
  const { id } = event.pathParameters;

  try {
    const result = await globals.dynamoDB
      .get({
        TableName: globals.itemTableName,
        Key: { id },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result?.Item),
    };
  } catch ({ message }) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message }),
    };
  }
};
