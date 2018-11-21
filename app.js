var AWS = require("aws-sdk");


const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.hello = (event,context,callback) => {
  var response = {
    "statusCode":200,
    "headers": {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
    },
    "body":JSON.stringify({
      message:'my first serverless api'
    }),
  };
  callback(null,response);
}


module.exports.getUsers = function(event, context, callback){
	var params = {
		TableName : USERS_TABLE
	};
	dynamoDb.scan(params, function(err, data){
		if(err){
      var response = {
        "statusCode":403,
        "headers": {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        "body":JSON.stringify(err),
      };
		    callback(response, null);
		}else{
      var response = {
        "statusCode":200,
        "headers": {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        "body":JSON.stringify(data),
      };
		    callback(null, response);
		}
	});
}

module.exports.createUser = function(event, context, callback){
	  var json = JSON.parse(event.body);
  var param = {
    Item : {
      "userId":json.userId,
      "name" :json.name
    },
    TableName :  USERS_TABLE
  };
  
  
  dynamoDb.put(param, function(err, data){
	   
    if(err){
      console.log("err-------------->",err);
	    console.log("in error code,unable to create user");
      var response = {
        "statusCode":403,
        "headers": {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        "body":JSON.stringify(err),
      };
      callback(response, null);
    }else{
      console.log("in success code,able to create user",data);
      var response = {
        "statusCode":200,
        "headers": {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
        },
        "body":JSON.stringify(data),
      };
      callback(null,response)
    }
  });
}


