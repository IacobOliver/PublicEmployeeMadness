import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import {useAtom} from "jotai";
import state from "./AtomStates"



const fetchEmployees = () => {
  return fetch(`/api/employees`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [refreshEmployees, setRefreshEmployees] = useAtom(state.refreshEmployees)
 

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        console.log('refresh done')
      })
  }, [refreshEmployees]);

  if (loading) {
    return <Loading />;
  }

  return (
  <EmployeeTable employees={employees} onDelete={handleDelete} />
  )
};

export default EmployeeList;
