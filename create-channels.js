const AWS = require("aws-sdk");
const crypto = require("crypto");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { category, name, description, userUUID, thumbnail, mature } = JSON.parse(event.body)
  const params = {
    TableName: "channels",
    Item: {
      name: name,
      userUUID: userUUID,
      category: category,
      description: description,
      thumbnail: thumbnail,
      mature: mature
    }
  }
  try {
    const data = await documentClient.put(params).promise()
    return { response: 'Channel created successfully', statusCode: 200 }
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify(e)
  }
  }
}
