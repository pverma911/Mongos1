
const express = require('express');
require('./db/mongo');
const mongodb= require('mongodb');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Candidate = require('./models/candidate');
const Testscore = require('./models/test_scores');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(express.json())

const port = process.env.PORT || 3000


const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/';   // URL to connect to dbase
    // Database Name
const databaseName = 'user-data'


// Create users

app.post('/users', async (req,res) =>{
    
    const user = new Candidate({
        name: req.body.name,
        rollno: req.body.rollno,
        email: req.body.email,
        address: req.body.address
    });

    try{
        await user.save();
        res.send(user);
    } catch(err){
        res.send(err)
    }
    

})

// Get users
app.get('/users', async (req,res) =>{
    // res.send(req.user);
    try{
        const candidate = await Candidate.find()
        res.send(candidate)
    } catch(err){
        res.send({message:err})
    }
    
})


// Add testscores as per rollno(which is in candidate collection) after candidate is created,as param.

app.patch('/users/:rollno', async (req,res) =>{


    console.log(req.params.rollno);

    try{
        const marks =  await Testscore.updateOne(
            {rollno: req.params.rollno}, 
            {$set: {first_round: req.body.first_round, second_round: req.body.second_round , third_round: req.body.third_round}})
        res.send(marks)
    }

    catch(err){
        res.send(err);
    }

})


// get testScores
app.get('/getscores', async (req,res) =>{
    try{
        const scores = await Testscore.find()
        res.send(scores)
    } catch(err){
        res.send({message:err})
    }
})


// add candidates scores:

app.post('/putscore', (req,res) =>{
    const total = Number(req.body.first_round) +Number(req.body.second_round) +Number(req.body.third_round)
    const test = new Testscore({
        rollno: req.body.rollno,
        first_round: req.body.first_round,
        second_round: req.body.second_round,
        third_round: req.body.third_round,
        total: total
    });


    test.save().then((test) => {
        console.log('saved', test)
        res.send(test)
    });
})

// Find max marks
app.get('/maxmarks', async (req,res) =>{

    try{
        const maxmark = await Testscore.findOne({}).sort('-total');
        res.send(maxmark)
    }

    catch(err){
        res.send(err);
    }

})

// Average marks per round:

app.get('/avgmarks', (req,res) =>{
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } ,(err,client)=> {
        if(err){
            console.log('Unable to connect to the server', err)
        }
        
        const db= client.db(databaseName);


        db.collection('testscores').aggregate([
            // match condition to match for specific rollno
            // { $match: { rollno: { $in: [1,2] } } },
            {
              $group: {
                _id: null,
                total_average: { $avg: "$total" },
                first_round: { $avg: "$first_round" },
                second_round: { $avg: "$second_round" },
                third_round: { $avg: "$third_round" }
              }
            }
          ], (err,result)=>{
            console.log(result);
          })
          
    }); 


})



app.listen(port, () =>{
    console.log('API has started');
})

