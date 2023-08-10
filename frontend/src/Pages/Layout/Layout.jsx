import { Outlet, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {useAtom} from "jotai"
import state from "../AtomStates"
import {useRef, useEffect} from "react"


import "./Layout.css";

export default function Layout({eqRef}){
 const [employeeBtnRefAtom, setEmployeeBtnRefAtom] = useAtom(state.employeeBtn);
const [equipmentBtnRefAtom, setEquipmentBtnRefAtom] = useAtom(state.equipmentBtn);
const [globalEmployees, setGlobalemployees] = useAtom(state.globalEmployees);
const [globalEquipment, setGlobalEquipment] = useAtom(state.globalEquipment);
const [refreshEmployees] = useAtom(state.refreshEmployees)
const params = useParams();


const fetchEmployees = () => {
  return fetch(`/api/employees`).then((res) => res.json());
};

const fetchEquipment = () =>{
  return fetch("/api/equipment").then(res => res.json());
}

useEffect(() =>{
  fetchEmployees()
  .then( data => setGlobalemployees(data));
},[refreshEmployees])

useEffect(() =>{
  fetchEquipment()
  .then(data => setGlobalEquipment(data));
},[params])


  return(
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li className="grow">
          <Link to="/equipment">Equipment</Link>
        </li>
        <li>
          <Link to="/createEquipment">
            <button id="createEquipment" ref={employeeBtnRefAtom} type="button">Create Equipment</button>
          </Link>
        </li>
        <li>
          <Link to="/create">
            <button id="createemployee" ref={equipmentBtnRefAtom} type="button">Create Employee</button>
          </Link>
        </li>
       
      </ul>
    </nav>
    <Outlet />
  </div>
);
}


