
const express = require('express');
require('./db/mongo');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Candidate = require('./models/candidate');
const Testscore = require('./models/test_scores');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())



// MongoDB 



app.post('/users', (req,res) =>{
    const me = new Candidate(req.body);


    me.save().then((me) => {
        console.log('saved', me)
        res.send(me)
    });
    

})


app.get('/users', (req,res) =>{
    // res.send(req.user);
    console.log(req.params);
})


// testScores

app.patch('/users', async (req,res) =>{

    const user = await Candidate.findOneAndUpdate({rollno})



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

// app.post('/putscore', (req,res) =>{
//     const test = new Testscore(req.body);


//     test.save().then((test) => {
//         console.log('saved', test)
//         res.send(test)
//     });
// })










app.listen(3000, () =>{
    console.log('API has started');
})

