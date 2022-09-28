const express = require('express');
// Express module ko import kia
const path = require('path');
// const { send } = require('process');

const app = express(); // making app of express
// aise krke express app ko initilze kr dia

const fs = require('fs');
// const { name } = require('pug/lib');

const port = 80;

// EXPRESS SPECIFIC stuff

app.use('/static', express.static('static'));
// Form ka data hum kaise la skte hai, jaise ki: ki post karega,
// humko wo data mil jaye, uske liye hum middleware use karenge.

app.use(express.urlencoded({ extended: true }));

// hum use krke hai urlencoded forms yani ki html forms ka data arha hai...
// ye middle ware help karega --> form ke data ko express tak lane k liye.

// url,folder
// for serving static files
// Static files--> browser mai hi, dikha dega jo code likha hua,
// if we do localhost:80/static/index.js
// index.js ka code browser mai dikha dega.

// PUG SPECIFIC stuff

// Set the template engine as pug.
app.set('view engine', 'pug');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// ENDPOINTS

app.get('/', (req, res) => {
  const con = 'This is the best game on the internet';
  const params = { title: 'PubG is the best game', content: con };
  res.status(200).render('index.pug', params);
});

app.post('/', (req, res) => {
  // console.log(req.body);
  // req.body is a JS object that has the information of the form/thing that is posted.

  const { name } = req.body;
  const { address } = req.body;
  const { age } = req.body;
  const { more } = req.body;
  const { gender } = req.body;

  const params = { message: 'Your form has been submitted successfully' };

  const outputToWrite = `The name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her ${more}`;

  fs.writeFileSync('output.txt', outputToWrite);

  res.status(200).render('index.pug', params);
});

/// /////////////////////////////////////////////////////////////////////
// //Our pug demo endpoint
// app.get("/demo", (req,res)=>{
//     res.status(200).render('demo',{
//         title: 'Hey Dx', message:'Hello There and thanks for telling me how to use Pug!'
//     });
// });

// app.get("/", (req,res)=>{
//     res.send("This is Homepage of my first express app with Harry");

// });

// app.get("/contact", (req,res)=>{
//     res.status(200).send("This is Homepage of my first express app with Harry");

// });

// app.get("/bad", (req,res)=>{
//     res.status(404).send("This page cannot be found");
// });

// app.get("/about", (req,res)=>{
//     res.send("This is About page of my first express app with Harry");

// });

// // get request handle krna chahta hu, /about par.

// app.post("/about", (req,res)=>{
//     res.send("This is a post request of the About page of my first express app with Harry");

// });

/// /////////////////////////////////////////////////////////////

// START THE SERVER
app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});

// app.listen v toh krna padega...
// request ko listen v toh krna padega.
