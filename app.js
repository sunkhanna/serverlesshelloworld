var AWS = require("aws-sdk");

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fs = require("fs");
const join = require("path").join;
const s3Zip = require("s3-zip");
var s3 = new AWS.S3();

module.exports.hello = (event, context, callback) => {
  var response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({
      message: "my first serverless api"
    })
  };
  callback(null, response);
};

module.exports.getUsers = function(event, context, callback) {
  var params = {
    TableName: USERS_TABLE
  };
  dynamoDb.scan(params, function(err, data) {
    if (err) {
      var response = {
        statusCode: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(err)
      };
      callback(response, null);
    } else {
      var response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(data)
      };
      callback(null, response);
    }
  });
};

module.exports.createUser = function(event, context, callback) {
  var json = JSON.parse(event.body);
  var param = {
    Item: {
      userId: json.userId,
      name: json.name
    },
    TableName: USERS_TABLE
  };

  dynamoDb.put(param, function(err, data) {
    if (err) {
      var response = {
        statusCode: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(err)
      };
      callback(response, null);
    } else {
      console.log("in success code,able to create user", data);
      var response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(data)
      };
      callback(null, response);
    }
  });
};

module.exports.processXmlDataFromS3 = async function(event, context, callback) {
  var options = {
    Bucket: "https://s3.eu-central-1.amazonaws.com/serverlessnodeapp/",
    Key: "xmlsamples.zip"
  };

  var localDestination = path.join(__dirname, options.key);

  if (typeof localDest == "undefined") {
    localDest = keyName;
  }

  var response = await downloadZipFromS3(options, localDestination);

  console.log("response finalllllllll", response);
};

var downloadZipFromS3 = (options, localDestination) => {
  console.log("in download zip from s3", options, localDestination);

  let file = fs.createWriteStream(localDestination);

  s3.getObject(options)
    .createReadStream()
    .on("end", () => {
      console.log("done");
      resolve("succesfully downloaded the file");
    })
    .on("error", error => {
      console.log("not done");
      reject(error);
    })
    .pipe(file);
};

// var s = new s3Unzip(
//   {
//     bucket:
//       "https://s3.eu-central-1.amazonaws.com/serverlessnodeapp/xmlsamples.zip",
//     file: "data.zip",
//     //deleteOnSuccess: true,
//     verbose: false
//   },
//   function(err, success) {
//     if (err) console.error(err);
//     else console.log(success);
//   }
// );
