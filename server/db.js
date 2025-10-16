const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log('DB is running')
})
.catch((err)=>{
    console.log(err.message)
})

module.exports = mongoose;