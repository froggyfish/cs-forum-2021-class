const mongoose = require("mongoose");

function connect(callback){
    let connectionString = `mongodb+srv://froggy:myCoolPassword@cluster0.cgzhh.mongodb.net/forum_app?retryWrites=true&w=majority`

    console.log("connect to the db...");

    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch((err) => {
        console.log("there was an error in conecting to mango: ", err)
    })
    mongoose.connection.once('open', callback)

}

module.exports = connect;