const mongoose = require('mongoose');

const db = process.env.DATABASE;

mongoose.connect(db, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS: 60000,
}).then(()=>{
    console.log("Connection Successfull");
}).catch((e)=>{
    console.log(e);
})

