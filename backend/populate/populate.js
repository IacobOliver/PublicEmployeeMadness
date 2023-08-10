/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const favBrands = require("./favBrands.json");
const favColors = require("./favColors.json")
const EmployeeModel = require("../db/employee.model");
const FavBrandsModel = require("../db/brand.model")
const FavColorsModel = require("../db/color.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateColors = async() =>{
  await FavColorsModel.deleteMany({});

 const colors =  favColors.map( color =>{
    return { color : color}
  })

  await FavColorsModel.create(...colors)
}

const populateBrands = async() =>{
  await FavBrandsModel.deleteMany({})

  const brands = favBrands.map( brand =>({
    name: brand
  }));
  console.log(brands)

  await FavBrandsModel.create(...brands)

}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  let brands = await FavBrandsModel.find({})
  brands = brands.map(brand => brand._id)

  let colors = await FavColorsModel.find({});
  colors = colors.map( color => color._id)
  

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    favBrand: pick(brands),
    favColor: pick(colors)
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateColors()
  await populateBrands()
  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
