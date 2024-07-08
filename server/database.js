const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect("mongodb://alokverma0122:alok74@ac-beu7tla-shard-00-00.jtkqykg.mongodb.net:27017,ac-beu7tla-shard-00-01.jtkqykg.mongodb.net:27017,ac-beu7tla-shard-00-02.jtkqykg.mongodb.net:27017/testing?ssl=true&replicaSet=atlas-i3qobz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0", {
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
