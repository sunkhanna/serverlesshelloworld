var AWS = require("aws-sdk");

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fs = require("fs");
const join = require("path").join;
const s3Zip = require("s3-zip");
var path = require("path");
var s3Unzip = require("s3-unzip");
//var s3 = new AWS.S3();

//var s3 = new AWS.S3()

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
  console.log("processXmlDataFromS3");
  var unzipFileResponse = await unzipFile();
  console.log("response finalllllllll", unzipFileResponse);
};

var unzipFile = () => {
  let options = {
    Bucket: "xmltester123",
    Delimiter: "/xmlsamples/"
  };
  console.log("running unzip file function");
  return new Promise(function(resolve, reject) {
    new s3Unzip(
      {
        bucket: "xmltester123",
        file: "xmlsamples.zip",
        deleteOnSuccess: false,
        verbose: true
      },
      function(err, success) {
        if (err) {
          console.log("error in unzipping file");
          reject(err);
        } else {
          s3.listObjects(options, function(err, data) {
            if (err) {
              console.log("error in listing data");
              reject(err);
            } else {
              console.log("resolved dataaaaaaaaaaaa", data);
              // var response = getDataFromXmlFiles(data);
              // if (response == "error") {
              //   reject(response);
              // } else {
              //   resolve(response);
              // }
              // resolve(data);
            }
          });
        }
      }
    );
  });
};

var getDataFromXmlFiles = data => {
  return new Promise(function(resolve, reject) {
    data.Contents.forEach(function(currentValue, index, array) {});
  });
};

var processUnzippedFiles = () => {
  console.log("process unzipped files");
  return new Promise(function(resolve, reject) {
    s3.listObjects({}, function(err, data) {
      if (err) {
        console.log("errorrrrrrrrrrrrrrrrrr", err);
      } else {
        console.log("dataaaaaaaaaaaaaaaaaaaaaa", data);
      }
      // if (err) {
      //   console.log("errorrrrrrrrrrrr----->", err);
      //   reject("error in listing objects");
      //   // console.log(err, err.stack);
      // } else {
      //   console.log("objects listedddddd", data);
      //   data.Contents.forEach(function(currentValue, index, array) {
      //     console.log("Retrieving the file : " + currentValue.Key);
      //   });
      // }
    });
  });
};

var downloadZipFromS3 = () => {
  console.log("in download zip from s3");
  let options = {
    Bucket: "xmltester123",
    Key: "xmlsamples.zip"
  };
  return new Promise(function(resolve, reject) {
    s3.getObject(options, function(err, data) {
      if (err) {
        console.log("error in getting data");
        reject(err);
      } else {
        console.log("got the data", data);
        fs.writeFile("/tmp", data.Body, function(err) {
          if (err) {
            console.log("error in writing the file to temporary folder");
            reject(err);
          } else {
            console.log("succesfully downloaded the file");
            resolve("File succesfuly downloaded");
          }
        });
      }
    });
  });
};

// var downloadZipFromS3 = () => {
//   let options = {
//     Bucket: "xmltester123",
//     Key: "xmlsamples.zip"
//   };
//   return new Promise(function(resolve, reject) {
//     console.log("in promise");
//     s3.getObject(options, function(err, data) {
//       console.log("get objectsssssssssssssssss");
//       if (err) {
//         console.log("get objectsssssssssssssssss error", err);
//         reject(err);
//       } else {
//         console.log("get objectsssssssssssssssss data", data);
//         resolve(data);
//       }
//     });
//   });
// };
