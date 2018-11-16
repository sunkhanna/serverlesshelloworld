//const express = require('express')
const sls = require('serverless-http')
const bodyParser = require('body-parser')
var AWS = require("aws-sdk");
//const app = express()

//app.use(bodyParser.json({ strict: false }));

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
  console.log("response-------------->",response);
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
        "body":JSON.stringify(err),
      };
		    callback(null, response);
		}
	});
}


module.exports.createUser = function(event, context, callback){
  var params = {
    Item : {
      "id":event.id,
      "name" : event.name
    },
    TableName :  USERS_TABLE
  };
  dynamoDb.put(params, function(err, data){
	   
    if(err){
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
	    console.log("in success code,able to create user");
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

// module.exports.getData = (event,context,callback) => {

// }
// app.get('/', async (req, res, next) => {
//       var res = {
//         'statusCode': 200,
//         'headers': { 'Content-Type': 'application/json' },
//         'body': JSON.stringify({ 'username': 'bob', 'id': 20 })
//     }
//       callback(null,res);
//     //  res.send();
//   //res.status(200).send('Hello World!')
// })


// app.get('/users/:userId', function (req, res) {
//   const params = {
//     TableName: USERS_TABLE,
//     Key: {
//       userId: req.params.userId,
//     },
//   }

//   dynamoDb.get(params, (error, result) => {
//     if (error) {
//       console.log(error);
//       res.status(400).json({ error: 'Could not get user' });
//     }
//     if (result.Item) {
//       const {userId, name} = result.Item;
//       res.json({ userId, name });
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   });
// })

// // Create User endpoint
// app.post('/users', function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== 'string') {
//     res.status(400).json({ error: '"userId" must be a string' });
//   } else if (typeof name !== 'string') {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   dynamoDb.put(params, (error) => {
//     if (error) {
//       console.log(error);
//       res.status(400).json({ error: 'Could not create user' });
//     }
//     res.json({ userId, name });
//   });
// })


//module.exports.server = sls(app)
