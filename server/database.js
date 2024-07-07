const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/testing", {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB ka Connection is Successful"))
    .catch( (error) => {
        console.log("Issue in DB Connection");
        console.error(error.message);
        //iska matlab kya h ?
        process.exit(1);
    } );
}

module.exports = dbConnect;