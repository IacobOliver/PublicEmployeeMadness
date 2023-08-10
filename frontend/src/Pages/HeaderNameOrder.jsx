import {useAtom} from "jotai"
import {useEffect} from "react"
import state from "./AtomStates"
import EmployeeTable from "../Components/EmployeeTable"


export default function HeaderNameOrder(){
   
    const [globalEmployees, setGlobalemployees] = useAtom(state.globalEmployees)
    const filter = window.location.pathname.split("/")[2];
    let order = window.location.pathname.split("/")[3];
    order = order == "asc"? 1 : -1

    const deleteEmployee = (id) => {
        return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
          res.json()
        );
      };

      const handleDelete = (id) => {
        deleteEmployee(id);
    
        setGlobalemployees((employees) => {
          return employees.filter((employee) => employee._id !== id);
        });
      };

       const orderedGlobalEmployees = [...globalEmployees]?.sort((a,b) =>{
        if(a[filter] > b[filter]){
            return 1*order
        }else {
            return -1 * order
        }
      })

    return(
        <>
        <EmployeeTable employees={orderedGlobalEmployees} onDelete={handleDelete}/>
        </>
    )
}