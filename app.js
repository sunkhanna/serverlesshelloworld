var AWS = require("aws-sdk");

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const fs = require("fs");
const join = require("path").join;
const s3Zip = require("s3-zip");
var path = require("path");
var s3 = new AWS.S3();

module.exports.processXmlDataFromS3 = async function(event, context, callback) {
  // var localDestination = path.join(__dirname, options.key);

  var localDestination = __dirname + "/xmlsamples.zip";
  if (typeof localDestination == "undefined") {
    localDestination = keyName;
  }

//  var response = await downloadZipFromS3(localDestination);

//  console.log("response finalllllllll", response);
};

var downloadZipFromS3 = localDestination => {
  let options = {
    Bucket: "https://s3.eu-central-1.amazonaws.com/serverlessnodeapp/",
    Key: "xmlsamples.zip"
  };

  console.log("options", options);

  console.log("in download zip from s3", localDestination);

  let file = fs.createWriteStreamSync(localDestination);

  s3.getObject(options, function(err, data) {
    // Handle any error and exit
    if (err) {
      console.log("err", err);
      return err;
    } else 
    {
      console.log("data", data);
    }

    // No error happened
    // Convert Body from a Buffer to a String

    //let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
  });
}
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
