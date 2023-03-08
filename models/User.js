const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    userName:{type:String, require: true, unique: true},
    email:{type: String, require:true, unique:true},
    password:{type:String, require:true},
    images: { type: String },
    isAdmin:{type:Boolean, default:false}
},
{ timestamps: true }

)
module.exports = mongoose.model("User", userSchema)