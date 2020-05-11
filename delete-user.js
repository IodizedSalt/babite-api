const AWS = require("aws-sdk");

AWS.config.region = 'eu-central-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'cognito_identity_pool_id',
});
exports.handler = async (event) => {
   AWS.config.update({
  accessKeyId: 'access_key',
  secretAccessKey: 'secret_access_key',
  region: 'eu-central-1',
});
const cognito = new AWS.CognitoIdentityServiceProvider();

await cognito.adminDeleteUser({
  UserPoolId: 'userpoolid',
  Username: 'user_to_delete',
}).promise();
};
