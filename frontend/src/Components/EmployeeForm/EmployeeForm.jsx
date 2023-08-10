import { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel, equipment }) => {
  const [favBrands, setFavBrands] = useState(null)
  const [favColors, setFavColors] = useState(null)


  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];
    
    const employeeInfo = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    console.log(employeeInfo)
    return onSave(employeeInfo);
  };

  const fetchFavBrands = () =>{
    return fetch("/api/favBrands").then(res => res.json())
  }

  const fetchFavColors = () =>{
    return fetch("/api/favColors").then(res => res.json())
  }



  useEffect(() =>{
    fetchFavBrands().then( res => {
      setFavBrands(res);
    });
    fetchFavColors().then( res =>{
      setFavColors(res);
    });
  },[])

  const LoadEquipmentList = () =>{
    return(
      <select name="equipmentUsed" id="equipmentUsed">
      {
        equipment &&  [...equipment].map((tool,index) => <option key={index} value={tool.name}>{tool.name}</option> )
      }
      </select>
    )
  }

  const LoadFavBrandsList = () =>{
    return(
      <select name="favBrand" id="favBrands" defaultValue={employee? employee.favBrand : null}>
        {
          favBrands?.map((brand,index) => <option key={index} value={brand._id} >{brand.name}</option>)
        }
      </select>
    )
  }

  const LoadFavColorsList = () =>{
    return(
      <select name="favColor" id="favColor" defaultValue={employee? employee.favColor : null}>
        {
          favColors?.map((color,index) => <option key={index} value={color._id} >{color.color}</option>)
        }
      </select>
    )
  }

  const salaryInputEvent = (e) =>{
    let levelInput = document.getElementById("level")
    e.value >= 0 && e.value <=100? levelInput.value = "Junior" :
      e.value > 100 && e.value < 301 ? levelInput.value = "Medior" :
       e.value > 300 && e.value < 401 ? levelInput.value = "Senior" :
         e.value > 400 && e.value < 801 ? levelInput.value = "Expert" :
           e.value > 801 ? levelInput.value = "Godlike" : console.log("ia gata")
  }
 

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
          readOnly
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <LoadEquipmentList/>
      </div>

      <div className="control">
        <label htmlFor="favBrand">Favorite Brand</label>
        <LoadFavBrandsList/>
      </div>

      <div className="control">
        <label htmlFor="favColor">Favorite Color</label>
        <LoadFavColorsList/>
      </div>

      <div className="control">
        <label htmlFor="salary">Salary</label>
        <input
          // defaultValue={employee ? employee.position : null}
          onInput={() =>{
            salaryInputEvent(document.getElementById("salary"))
          }}
          defaultValue={employee ? employee.salary : 0}
          name="salary"
          id="salary"
          type="number"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
