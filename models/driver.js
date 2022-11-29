import mongoose from "mongoose";
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
        type: ObjectId,
        required: true,
    },
    photo: {
        type: String
    },
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


export default mongoose.model('Post', postShema); 

