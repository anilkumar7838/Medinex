const App =require('./app');
const connectDatabase =require("./config/database");

// ******** Path : server-->app-->Routes-->Controllers-->Model **********


// --------Handling Uncaught Exception----------
process.on("uncaughtException",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught Exception");
  process.exit(1);
});

//---- config ----
require('dotenv').config({path:"./config/config.env"});

//---Connecting to database---
connectDatabase();

const server = App.listen(process.env.PORT,"0.0.0.0",()=>{
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// ------- Error Handling in server -----

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
  console.log(`"Error": ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");
  server.close(()=>{
    process.exit(1);
  })
});

