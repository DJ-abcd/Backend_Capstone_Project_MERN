const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{

    try{
    const token = req.header('Authorization').split(' ')[1];
    if(!token) return res.status(401).json({message: 'Token not found'});

    const decoded = jwt.verify(token,'secret');
    req.user = decoded;
    next();
    //bearer 3ipngsvsrpdfghj


    }catch (error) {
        return res.status(401).json({message: 'Token not found or valid'});
    }

};

module.exports = verifyToken;










// const jwt = require('jsonwebtoken');

// const JWT_SECRET = process.env.JWT_SECRET;
// const verifyToken = (req, res, next) => {

//     try {
//         const token = req.header('Authorization').split(' ')[1];
//         if (!token) return res.status(401).json({ message: 'Token Not Found ' });

//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.refUserId = decoded.userID;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Token Not Found or Valid' });
//     }
// };

// module.exports = verifyToken;