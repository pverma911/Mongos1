const mongoose = require('mongoose');




const scoreSchema = new mongoose.Schema({
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
    }
});



const Testscore= mongoose.model('Testscore', scoreSchema);




module.exports = Testscore;



 