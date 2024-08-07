const express = require('express');
const { default: mongoose } = require('mongoose');
const app=express();
const dotenv = require('dotenv').config();


mongoose.connect(process.env. MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.get('/health', (req,res)=>{
    //res.send
    //res.sendFile
    res.json({
        message:'Job listing API is working fine',
        status:'Working',
        active: true,
        date: new Date().toLocaleDateString()
    })
})

//localhost:3000/health

app.listen(3000,()=> {
    console.log('Server is running at 3000');
    // console.log(`Server is running at ${PORT}`);
})