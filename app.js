const express = require('express')
const sls = require('serverless-http')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json({ strict: false }));

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.get('/', async (req, res, next) => {
      var res = {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json' },
        'body': JSON.stringify({ 'username': 'bob', 'id': 20 })
    }
      res.send();
  //res.status(200).send('Hello World!')
})


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


module.exports.server = sls(app)
