import { atom } from "jotai";


const state = {
 inputSettings: atom(["",""]),
 employeeBtn: atom(null),
 equipmentBtn: atom(null),
 globalEmployees: atom(null),
 globalEquipment: atom(null),

 refreshEmployees: atom(0)
}

export default state;