import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    title:{
        type:String,
        required:[true, 'Please provide the category title'],
        minLength:[3, 'title sholud have atleast 3 chars'],
        maxLength:[30, 'title length should not exceed 30'],
        unique:true
    },
    image:{
        type:String
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref:'product'
        }
    ]
})


const Category = mongoose.model('category', categorySchema);
export default Category;