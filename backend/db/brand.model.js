const { Schema, model } = require("mongoose")

module.exports = model("Brand", new Schema({
    name: String
}))

