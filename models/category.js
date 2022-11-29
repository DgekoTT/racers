import mongoose from "mongoose";
const Shema = mongoose.Schema;

const categoryShema = new Shema({
    name: {
        type: String,
        required: true,
    },
    catId: {
        type: ObjectId,
        required: true,
    }
});

export default mongoose.model('Cat', categoryShema);