
const express = require('express');
require('./db/mongo');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Candidate = require('./models/candidate');
const Testscore = require('./models/test_scores');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.use(express.json())



// MongoDB 



app.post('/users', (req,res) =>{
    const user = new Candidate(req.body);


    user.save().then((user) => {
        console.log('saved', user)
        res.send(user)
    });
    

})


app.get('/users', async (req,res) =>{
    // res.send(req.user);
    try{
        const candidate = await Candidate.find()
        res.send(candidate)
    } catch(err){
        res.send({message:err})
    }
    
})


// testScores

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


    // const test = new Testscore(req.body);


    // test.save().then((test) => {
    //     console.log('saved', test)
    //     res.send(test)
    // });
    

})


app.get('/addscores', (req,res) =>{
    res.send(req.user);
})


// candidates scores:

app.post('/putscore', (req,res) =>{
    const test = new Testscore(req.body);


    test.save().then((test) => {
        console.log('saved', test)
        res.send(test)
    });
})










app.listen(3000, () =>{
    console.log('API has started');
})

