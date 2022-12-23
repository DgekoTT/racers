const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const postShema = new Shema({
    title: {
        type: String,
        require: true
    },
    author: { 
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    photo: {
        type: String
    },
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Driver =  mongoose.model('Driver', postShema); 
 module.exports = Driver;


