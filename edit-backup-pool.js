const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();
let ret = {};

exports.handler = (event, context, callback) => {
  const { channel_name, url, length } = JSON.parse(event.body);
  const params = {
    TableName: "channels",
    Key: { name: channel_name},
    UpdateExpression : "SET backup_pool.#url = :lenth",
    ConditionExpression : "attribute_not_exists(backup_pool.#url)",
    ExpressionAttributeNames : {
        "#url": url
    },
    ExpressionAttributeValues : {
        ":lenth": length
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
