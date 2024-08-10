const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const validateNewUser =require('../middleware/validateNewUser')
// post, get,put,patch


router.get('/',(req,res)=> {
    res.json({
        message:'User route is working',
        status:'Working',
    });
});

// router.post('/register',async(req,res)=>{
//     const {name,email,password} = req.body;
//    try{
//     const newUser = new User ({
//         name,
//         email,
//         password,
//     });
//     await newUser.save();
//     res.status(201).json({
//         message: 'User created successfully',
//         user: newUser
//     });
// }  catch(error) {
//     console.log(error);
//     res.status(500).json({
//         message: 'Internal Server Error',
//         error,
//     })
// }
// });



// we will create a validation

router.post('/register',validateNewUser, async(req,res)=>{
 
 try{
    
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email:email});
    
    if(existingUser){
        return res.status(400).json({
            message: 'User already exists , please use another email '
        })
    }else{
    const hashedPassword = await bcrypt.hash(password,10); 
    var newUser = await User.create({
        name,email,password:hashedPassword })
}
 
    res.status(201).json({
        message: 'User created successfully',
        User: newUser
    });
}

 catch(error) {
    console.log(error);
    res.status(500).json({
        message: 'Internal Server Error',
        error,
    })
}
});






router.post('/login',async (req,res)=>{
    const { email, password}=req.body;
    try{
        const existingUser = await User.findOne({email:email});

        if(existingUser){
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
            if(isPasswordCorrect){
                const token = jwt.sign(
                    {email:existingUser.email},//PAYLOAD - oject you want to convert to string
                    'secret', // SECRET key - it is being used in encrypt and validate
                    {expiresIn:'1h'} // Optional argumnet - to make token temporary
                )
                res.status(200).json({
                    message: 'Login successful',
                    email: existingUser.email,
                    token
                })

 // jsonwebtoken is string that tells server that user is authentic               
            }else {
                res.status(400).json({
                    message: 'Invalid credentials',
                })
            }
        }else{
            res.status(400).json({
                message: 'User not found'
            })
        }
    }catch(error) {
        res.status(500).json({
            message:'Internal server error',
            error,
        });
    }
});



module.exports = router;