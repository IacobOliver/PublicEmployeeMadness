// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: {
    type: Boolean,
    default: false,
  },
  equipmentUsed: {
   type: String,
   default : "none"
  },
  favBrand :{
    type: Schema.Types.ObjectId,
    ref: "Brand"
  },
  favColor:{
    type: Schema.Types.ObjectId,
    ref: "Color"
  },
  salary: Number
});

module.exports = mongoose.model("Employee", EmployeeSchema);
// favBrand: mongoose.Schema.Types.ObjectId