const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();
let ret = {};

exports.handler = (event, context, callback) => {
  const { channel_name, map_key, links } = JSON.parse(event.body);
  const params = {
    TableName: "channels",
    Key: { name: channel_name},
    UpdateExpression="SET programme.#map_key = :videos",
    ExpressionAttributeNames={
        "#map_key": map_key
    },
    ExpressionAttributeValues={
        ":videos": links
    }

  }

  ddb.update(params, function(err, data) {
    if (err){
      console.log(err, err.stack);
      ret.ddbUpdate = err;
      callback(null, {success: false, message: ["ddb upsert failed"], payload: ret});
    }
    else{
      console.log(data);
      ret.ddbUpdate = data;
      callback(null, {success: true, message: ["ddb upsert succeeded"], payload: ret});
    }
  })

};
