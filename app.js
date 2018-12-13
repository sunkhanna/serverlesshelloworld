var AWS = require("aws-sdk");

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fs = require("fs");
const join = require("path").join;
const s3Zip = require("s3-zip");
var path = require("path");
var s3 = new AWS.S3();

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
