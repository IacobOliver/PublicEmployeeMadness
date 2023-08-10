import {useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom";
import EmployeeTable from "../Components/EmployeeTable";


const fetchEmployees = (params) =>{
   return fetch(`/api/employees`).then(res => res.json())
}

const deleteEmployee = (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
      res.json()
    );
  };

export default function EmployeeSearch(){
    const [employees, setEmployees] = useState(null)
    const params = useParams()
    console.log(params)
    console.log(params.search)


    useEffect(() =>{
        fetchEmployees(params)
        .then( data => {
           setEmployees([...data].filter( elem => elem.name.toLowerCase().includes(params.search)))
        })

    },[])


    const handleDelete = (id) => {
        deleteEmployee(id);
    
        setEmployees((employees) => {
          return employees.filter((employee) => employee._id !== id);
        });
      };


    return(
       <EmployeeTable employees={employees} onDelete={handleDelete}/>
    )
}