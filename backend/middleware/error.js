const ErrorHandler = require("../utils/errorhandler");



module.exports = (err, req, res, next) =>{
    err.statuCode = err.statuCode || 500;
    err.message = err.message || "internal server error";

    //wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found . Invalid: ${err.path}`;
        err.statuCode = 400;
        err.message = message;
        //err = new ErrorHandler(message, 400);
    }

    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err.message = message;
        err.statuCode = 400;
        
    }

    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err.message = message;
        err.statuCode = 400;
        
    }

    //Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`;
        err.message = message;
        err.statuCode = 400;
        
    }

    //JWT EXPIRE error
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired, Try again`;
        err.message = message;
        err.statuCode = 400;
        
    }



    res.status(err.statuCode).json({
        success:false,
        message: err.stack,
    });
};