const mongoose = require('mongoose');






const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required: "Please enter name"
    },
    rollno:{
        type:Number,
        unique:true
    },
    email:{
        type:String,
        required: "Please enter your Email"
    },
    address:{
        type:String,
        required: "Please enter a Valid Address"
    }
});


const Candidate = mongoose.model('Candidate', candidateSchema);




module.exports = Candidate;