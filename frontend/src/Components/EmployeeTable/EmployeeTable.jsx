import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState} from "react";
import { useAtom } from "jotai";
import {useNavigate, useParams} from "react-router-dom"
import SearchContainer from "./EmployeeTableComponents/SearchContainer";
import state from "../../Pages/AtomStates"
import ReactPaginate from "react-paginate"

let contorSearchVisibility = 1;
let whitchWord, temporaryArr;
let ascOrDesForLevel =0; let ascOrDesForPosition=0;
export default function EmployeeTable({ employees, onDelete }) {

  const [sortedEmployees, setSortedEmployees] = useState(employees);
  const [[sortByNameCollumn, ascendingOrDescending], setSort] = useState([false, 1])
  const [[inputValue, filter], setInputSettings] = useAtom(state.inputSettings)
  const [wannaSort, setWannaSort] = useState(false);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(employees?.length % 10 != 0 ? Math.floor(employees?.length / 10) + 1 : employees?.length / 10);
  const [refreshEmployees, setRefreshEmployees] = useAtom(state.refreshEmployees)
  const navigate = useNavigate()

  // const [employeeBtnRefAtom, setEmployeeBtnRefAtom] = useAtom(state.employeeBtn);
  // const [equipmentBtnRefAtom, setEquipmentBtnRefAtom] = useAtom(state.equipmentBtn);

  // employeeBtnRefAtom.current.style.visibility = "visible"
  // equipmentBtnRefAtom.current.style.visibility = "hidden"

  //document.getElementById("createemployee").style.visibility = "visible"
  //document.getElementById("createEquipment").style.visibility = "hidden"

  const SearchEmployeeEvent = () => {
    contorSearchVisibility % 2 == 0 ? document.getElementById("searchContainer").style.visibility = "hidden" : document.getElementById("searchContainer").style.visibility = "visible";
    contorSearchVisibility++;
  }

  const OrderButtons = (e) => {

    if (!wannaSort) {
      setWannaSort(true);
      e.target.classList.add("selectedSort");
      makeTheOtherButtonsInvisible(e, true);

      if (e.target.id == "FirstName" || e.target.id == "MiddleName" || e.target.id == "LastName") {
        whitchWord = e.target.id == "FirstName" ? whitchWord = 0 : e.target.id == "MiddleName" ? 1 : e.target.id == "LastName" ? 2 : null;

        setSortedEmployees(old => [...old]?.sort((a, b) => {
          let aElem = whitchWord, bElem = whitchWord;

          if (a.name.split(" ").length == 2 && whitchWord == 2) aElem = whitchWord - 1;
          if (b.name.split(" ").length == 2 && whitchWord == 2) bElem = whitchWord - 1;

          if (a.name.split(" ")[aElem] < b.name.split(" ")[bElem]) {
            return -1;
          } else {
            return 1;
          }
        }));


      }

    } else {
      setWannaSort(false);
      e.target.classList.remove("selectedSort");
      makeTheOtherButtonsInvisible(e, false);
      setSortedEmployees(employees);
    }

    if (e.target.id == "FirstName" || e.target.id == "MiddleName" || e.target.id == "LastName") {
      whitchWord = e.target.id == "FirstName" ? whitchWord = 0 : e.target.id == "MiddleName" ? 1 : e.target.id == "LastName" ? 2 : null;

      setSortedEmployees(old => [...old]?.sort((a, b) => {
        let aElem = whitchWord, bElem = whitchWord;

        if (a.name.split(" ").length == 2 && whitchWord == 2) aElem = whitchWord - 1;
        if (b.name.split(" ").length == 2 && whitchWord == 2) bElem = whitchWord - 1;

        if (a.name.split(" ")[aElem] < b.name.split(" ")[bElem]) {
          return -1;
        } else {
          return 1;
        }
      }));


    }

  }

  const makeTheOtherButtonsInvisible = (e, setVisibility) => {
    let allBtn = e.target.parentElement.querySelectorAll("button");
    setVisibility ? [...allBtn].map(button => button.classList.value.includes("selectedSort") ? button.style.visibility = "visible" : button.style.visibility = "hidden")
      :
      [...allBtn].map(button => button.style.visibility = "visible")
  }

  const checkBoxEvent = (e) => {

    fetch(`/api/employees/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ present: e.target.checked == true? true : false })
    });

    setRefreshEmployees(refreshEmployees + 1);

    sortedEmployees?.map(employee => { // updating the sorting too 
      if (employee._id == e.target.id){
       employee.present = e.target.checked == true? true : false;
      }
     return employee
   })

  }

  const handlePageChange = (e) => {
    console.log(e.selected)
    setPage(e.selected + 1)
  }

  const nameButtonEvent = () => {
    setSort([true, ascendingOrDescending + 1])

    let order = ascendingOrDescending % 2 == 0 ? 1 : -1;


    setSortedEmployees(prev => [...prev].sort((a, b) => {
      if (a.name.split(" ")[0] > b.name.split(" ")[0]) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    }))
    console.log("ok")
  }

  const headerButtonEvent = (e) =>{
    e.target.innerText == "Level"? ascOrDesForLevel++ : ascOrDesForPosition++
    // navigate(`/employees/${e.target.innerText.toLowerCase()}/asc`)
    e.target.innerText == "Level"? navigate(`/employees/level/${ascOrDesForLevel % 2 == 0? "asc" : "des"}`) :
    navigate(`/employees/position/${ascOrDesForPosition % 2 == 0? "asc" : "des"}`)
  }

  return (
    <div className="EmployeeTable">
      <table>
        <thead>

          <tr>
            <td colSpan={4}>
              <div><button onClick={SearchEmployeeEvent}>Search Employee</button></div>
              <SearchContainer setNumberOfPages={setNumberOfPages} employees={employees}/>
              <div id="orderButtons">
                <button id="FirstName" onClick={OrderButtons} >Order List By First Name</button>
                <button id="MiddleName" onClick={OrderButtons}>Order List By Middle Name</button>
                <button id="LastName" onClick={OrderButtons}>Order List By Last Name</button>
                <button id="Position" onClick={OrderButtons}>Order List By Position</button>
                <button id="Level" onClick={OrderButtons}>Order List By Level</button>
              </div>
            </td>
          </tr>

          <tr>
            <td colSpan={4}>
              <ReactPaginate
                pageCount={numberOfPages}
                marginPagesDisplayed={3}
                onPageChange={handlePageChange}
                containerClassName={"pagination justify-content-center"}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousLinkClassName="page-link"
                previousClassName="page-item"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-Link"
                activeClassName="active"
              />
            </td>
          </tr>

          <tr>
            <th><div onClick={nameButtonEvent} style={{ cursor: "pointer" }}>Name</div></th>
            <th><div onClick={headerButtonEvent}>Level</div></th>
            <th><div onClick={headerButtonEvent}>Position</div></th>
            <th>Favorite Brand</th>
            <th>Present</th>
            <th />
          </tr>

        </thead>


        <tbody>


          {inputValue == "" && !wannaSort && (sortByNameCollumn ? sortedEmployees : employees)?.map((employee, index) => {
            if (index >= (page * 10 - 10) && index <= (page * 10 - 1))
              return (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    {employee.favBrand.name}
                  </td>
                  <td>
                    <input id={employee._id} onClick={checkBoxEvent} type="checkbox" defaultChecked={employee.present ? true : false} />
                  </td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button type="button" onClick={() => {
                      onDelete(employee._id);
                      setSortedEmployees((employees) => {
                        return employees?.filter((employe) => employe._id !== employee._id);
                      });
                    }}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
          })}


          {inputValue != "" && (

            temporaryArr = sortedEmployees.filter(employee => {
              if (filter == "level" ? employee.level.toLowerCase().includes(inputValue) : employee.position.toLowerCase().includes(inputValue))
                return employee
            }), //we are doing this for the indexes of the item to be in order when rendering for pagination

            // ( () => {
            //   setNumberOfPages(temporaryArr.length%10 != 0? Math.floor(temporaryArr.length/10)+1 : temporaryArr.length/10)
            //   return <></>
            //  })(),


            temporaryArr.map((employee, index) => {
              if (index >= (page * 10 - 10) && index <= (page * 10 - 1))
                return (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      {employee.favBrand.name}
                    </td>
                    <td>
                      <input id={employee._id} onClick={checkBoxEvent} type="checkbox" defaultChecked={employee.present ? true : false} />
                    </td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button type="button" onClick={() => {
                        onDelete(employee._id);
                        setSortedEmployees((employees) => {
                          return employees?.filter((employe) => employe._id !== employee._id);
                        });
                      }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            }))
          }

          {wannaSort && inputValue == "" &&
            [...sortedEmployees].map((employee, index) => {
              if (index >= (page * 10 - 10) && index <= (page * 10 - 1))
                return (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      {employee.favBrand.name}
                    </td>
                    <td>
                      <input id={employee._id} onClick={checkBoxEvent} type="checkbox" defaultChecked={employee.present ? true : false} />
                    </td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button type="button" onClick={() => {
                        onDelete(employee._id);
                        setSortedEmployees((employees) => {
                          return employees.filter((employe) => employe._id !== employee._id);
                        });
                      }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
            })
          }
        </tbody>
      </table>
    </div>
  );

}