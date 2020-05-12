const AWS = require("aws-sdk");
const crypto = require("crypto");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { category, name, description, userUUID, thumbnail, mature } = JSON.parse(event.body)

    const existing_channel = {
    TableName: "channels",
    Key: { name },
    Item: {
      name: name,
      userUUID: userUUID
    }
  }
    let result = await documentClient.get(existing_channel).promise();
    let empty_object_check = result.Item !== undefined && result.Item !== null

    // Check if database returned item is empty or if already exists under userUUID
    if (empty_object_check && result.Item.userUUID == userUUID) {
      return { statusCode: 500, body: ("CHANNEL EXISTS ALREADY")}

    }else if(empty_object_check&& result.Item.userUUID !== userUUID){
      return { statusCode: 500, body: ("CHANNEL EXISTS UNDER OTHER USER ALREADY")}

    }else{
      const params = {
        TableName: "channels",
        Item: {
          name: name,
          userUUID: userUUID,
          category: category,
          description: description,
          thumbnail: thumbnail,
          mature: mature,
          programme: {},
          backup_pool: {}
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

}
