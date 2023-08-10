import { Link } from "react-router-dom";
import "./EquipmentTable.css";
import { useState } from "react";





export default function EquipmentTable({ equipment , onDelete }) {


  
      // document.getElementById("createemployee").style.visibility = "hidden"
      // document.getElementById("createEquipment").style.visibility = "visible"

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>


        <tbody>
         

          { equipment?.map((tool) => (
            <tr key={tool._id}>
              <td>{tool.name}</td>
              <td>{tool.type}</td>
              <td>{tool.amount}</td>
              <td>
                <Link to={`/updateEquipment/${tool._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(tool._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}

          
          
        </tbody>
      </table>
    </div>
  );

}