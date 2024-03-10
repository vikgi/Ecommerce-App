const app = require("./app");

const dotenv = require("dotenv");
const { patch } = require("./server");

const cloudinary = require("cloudinary");

//Handling Uncaught Exception
process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Uncaught Exception`)
    process.exit(1);
})


const connectDatabase = require("./config/database")
//config
dotenv.config({path:"backend/config/config.env"})

//connecting to databse
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true

});

const server = app.listen(process.env.PORT, ()=>{

    console.log(`server is working on http://localhost:${process.env.PORT} `)

})

//Unhandled Promise Rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});