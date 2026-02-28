const mongoose = require('mongoose')
const { applyTimestamps } = require('./resturantModel')



const categorySchema = new mongoose.Schema({
 
    title:{
        type:String,
        required:[true,"CATEGORY TITLE REQUIRED "]
    },
    iamgeUrl:{
        type:String,
        default:"https://similarpng.com/collection/restaurant-logo/"
    }
},{timestamps:true})


const categoryModel = mongoose.model("category",categorySchema)

module.exports = categoryModel