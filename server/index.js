const todoRoute= require('./routes');

const express = require("express");
const app = express();
const cors = require("cors");

//load config from env file
//require("dotenv").config();
const PORT = process.env.PORT || 4000;
app.use(cors());
//middleware to parse json request body
app.use(express.json());

//import routes for TODO API
//index.jsconst todoRoutes = require("./routes/todos");

//mount the todo API routes
app.use("/api/v1", todoRoute);


//start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})

//connect to the database
const dbConnect = require("./database");
//const { deleteTodo } = require('./controller');
dbConnect();

//default Route
app.get("/", (req,res) => {
    res.send(`<h1> This is HOMEPAGE baby</h1>`);
})