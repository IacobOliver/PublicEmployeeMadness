import {useAtom} from "jotai"
import state from "./AtomStates"
import EmployeeTable from "../Components/EmployeeTable"

export default function MissingEmployees(){
    const [globalEmployees, setGlobalemployees] = useAtom(state.globalEmployees)
    

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

   


    return(
        <>
       {globalEmployees && <EmployeeTable employees={[...globalEmployees].filter( employee => !employee.present)} onDelete={handleDelete}/>}
        </>
    )
}