var AWS = require("aws-sdk");

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fs = require("fs");
const join = require("path").join;
var path = require("path");
var s3 = new AWS.S3();

module.exports.processXmlDataFromS3 = async function(event, context, callback) {
  file = fs.createWriteStream(localDest);
  console.log("processXmlDataFromS3");
  // var localDestination = path.join(__dirname, options.key);

  var localDestination = __dirname + "/xmlsamples.zip";
  if (typeof localDestination == "undefined") {
    localDestination = keyName;
  }

  var response = await downloadZipFromS3(localDestination);

  console.log("response finalllllllll", response);

  var finalResponse = await writeDataToLocalFileSystem(response);

  console.log("final responseeeeeeeeeee", finalResponse);
};

var downloadZipFromS3 = localDestination => {
  file = fs.createWriteStream(localDest);

  console.log("download zip");
  let options = {
    Bucket: "serverlessnodeapp",
    Key: "xmlsamples.zip"
  };

  console.log("options", options);

  console.log("in download zip from s3", localDestination);

  //let file = fs.createWriteStream(localDestination);

  return new Promise(function(resolve, reject) {
    console.log("in promise");
    s3.getObject(options, function(err, data) {
      console.log("get objectsssssssssssssssss");
      if (err) {
        console.log("get objectsssssssssssssssss error", err);
        reject(err);
      } else {
        console.log("get objectsssssssssssssssss data", data);
        resolve(data);
      }
    });
  });
  //console.log("in getting object");
  // Handle any error and exit
  // if (err) {
  //   console.log("err", err);
  //   return err;
  // } else console.log("data", data);

  // No error happened
  // Convert Body from a Buffer to a String

  //let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
  // });
};
//   s3.getObject(options)
//     .createReadStream()
//     .on("end", () => {
//       console.log("done");
//       resolve("succesfully downloaded the file");
//     })
//     .on("error", error => {
//       console.log("not done", error);
//       reject(error);
//     })
//     .pipe(file);
// };

var writeDataToLocalFileSystem = response => {
  response
    .createReadStream()
    .on("end", () => {
      resolve("seems happened");
    })
    .on("error", error => {
      reject("nopesssss");
    })
    .pipe(file);
};
