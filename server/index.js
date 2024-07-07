const todoRoute= require('./routes');

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());
//index.jsconst todoRoutes = require("./routes/todos");

app.use("/api/v1", todoRoute);
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})

const dbConnect = require("./database");
//const { deleteTodo } = require('./controller');
dbConnect();

app.get("/", (req,res) => {
    res.send(`<h1> This is HOMEPAGE</h1>`);
})
