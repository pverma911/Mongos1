const mongoose = require('mongoose');




const scoreSchema = new mongoose.Schema({
    rollno:{
        type:Number,
        unique: true
    },
    first_round:{
        type:Number,
        validate(value){
            if(value > 10){
                throw new Error('Maximum marks is 10')
            }
        }
    },
    second_round:{
        type:Number,
        validate(value){
            if(value > 10){
                throw new Error('Maximum marks is 10')
            }
        }
    },
    third_round:{
        type:Number,
        validate(value){
            if(value > 10){
                throw new Error('Maximum marks is 10')
            }
        }
    },
    total:{
        type:Number,
        }
});





const Testscore= mongoose.model('Testscore', scoreSchema);




module.exports = Testscore;



 