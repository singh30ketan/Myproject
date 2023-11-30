//whenever we want to connect to database we use mongoose
const mongoose=require('mongoose')

const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter the name of the product"]
        },
        quantity:{
            type:Number,
            required:true,
            default:0
        },
        price:{
            type:Number,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Product=mongoose.model('Product',productSchema)
module.exports=Product

//so this is the model of the schema of my upcoming database