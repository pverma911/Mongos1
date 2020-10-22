const mongoose = require('mongoose');






const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    rollno:{
        type:Number,
        unique:true
    },
    email:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    test_scores:{ 
        first_round:{
            type: Number
        },
        second_round:{
            type: Number
        },
        third_round:{
            type: Number
        }
    }
});


const Candidate = mongoose.model('Candidate', candidateSchema);




module.exports = Candidate;