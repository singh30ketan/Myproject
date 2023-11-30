const express=require('express')
const mongoose=require('mongoose')
const Product=require('./models/productModel')


const app=express()
//this is middleware, dont know a lot about this, but already know that wihtout it json data wont show
app.use(express.json())

//creatin first route
app.get('/',(req,res)=>{
    res.send("hello node api")
})

//another second route
app.get('/second',(req,res)=>{
    res.send("this is second page")
})


//inserting new data or product in database we use post
app.post('/createproducts',async(req,res)=>{
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

// //for getting all the data from database,for this we use get
app.get('/getproducts',async(req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


//for getting specific data from the database, we still use get and id
app.get('/getproducts/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const product=await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


//for updating the specific data by id in database, we use put
app.put('/updateproducts/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body)
        if(!product){ //cant find the product
            return res.status(404),json({message:`cannot find any product with this ${id}`})
        }
        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//for deleting the specific data by id in database, we use delete
app.delete('/deleteproducts/:id',async(req,res)=>{
    try {
        const{id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with this id ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


//connecting to database
mongoose.connect('mongodb+srv://nodeapi:1234@node-api-2.l254pmy.mongodb.net/Node-Api-2?retryWrites=true&w=majority')
.then(()=>{
    console.log("database connected")
    //listening on port number
    app.listen(3000,()=>{
        console.log("node app is running")
    })
})
.catch((error)=>{
    console.log(error)
})