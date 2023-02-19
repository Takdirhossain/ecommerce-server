const mongoose = require("mongoose")
const {Schema} = mongoose

const Slider = new Schema({
    image:{type: String, require: true}
})

module.exports = mongoose.Schema("Slider", Slider)