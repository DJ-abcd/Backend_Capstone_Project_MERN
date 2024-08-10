const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');
const verifyToken = require('./middleware/verifyTokens');




const app=express();
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});


app.use('/user',userRoute);
// app.use('/job',jobRoute); we will add middleware

app.use('/job',verifyToken,jobRoute); // this ensures the verify token is satisfied then only it can go to job routes;





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