const mongoose = require('mongoose');






const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        // required: true
    },
    rollno:{
        type:Number,
        // unique:true
    },
    email:{
        type:String,
        // required: true
    },
    address:{
        type:String,
        // required: true
    }
});


const Candidate = mongoose.model('Candidate', candidateSchema);




module.exports = Candidate;