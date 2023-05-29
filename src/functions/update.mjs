import { globals } from "../utils/globals.mjs";

export const handler = async (event) => {
  try {
    const { itemStatus } = JSON.parse(event.body);
    const { id } = event.pathParameters;

    await globals.dynamoDB
      .update({
        TableName: globals.itemTableName,
        Key: { id },
        UpdateExpression: "set itemStatus = :itemStatus",
        ExpressionAttributeValues: {
          ":itemStatus": itemStatus,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Item updated" }),
    };
  } catch ({ message }) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message }),
    };
  }
};
