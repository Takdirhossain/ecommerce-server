const mongoose = require("mongoose")
const {Schema} = mongoose

const category = new Schema({
    categoryName:{type:String, required:true},
    categoryImg:{type:String, required:true}
},  { timestamps: true }
)
module.exports = mongoose.model("Category", category)