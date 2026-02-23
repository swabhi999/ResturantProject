const mogoose = require('mongoose')
const colors = require('colors');
const { default: mongoose } = require('mongoose');

//function to connect to database 

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Db Connection Successfully : ${mongoose.connection.host}`.bgGreen.black);
    } catch (error) {
        console.log("db Error !!",error.message);
    }
}
   
module.exports = dbConnect