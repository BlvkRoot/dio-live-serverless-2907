import { globals } from "../utils/globals.mjs";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    await globals.dynamoDB
      .delete({
        TableName: globals.itemTableName,
        Key: { id }
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Item delete" }),
    };
  } catch ({ message }) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message }),
    };
  }
};
