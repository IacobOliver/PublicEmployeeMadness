import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAtom} from "jotai"
import EmployeeForm from "../Components/EmployeeForm";
import state from "./AtomStates"

const createEmployee = (employee) => {

  return fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [globalEquipment, setGlobalEquipment] = useAtom(state.globalEquipment)

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
  };

  return (
    <EmployeeForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateEmployee}
      equipment={globalEquipment}
    />
  );
};

export default EmployeeCreator;
