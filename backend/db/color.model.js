const mongoose = require("mongoose");
const {Schema, model} = mongoose

const colorsSchema = new Schema({
    color: String
})

module.exports = model("Color", colorsSchema)