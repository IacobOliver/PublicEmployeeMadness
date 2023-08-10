import { useState, useRef } from "react"
import { useAtom } from "jotai"
import state from "../../../Pages/AtomStates"

export default function SearchContainer({setNumberOfPages, employees}) {

    const [[inputValue, filter], setInputSettings] = useAtom(state.inputSettings)
  


    const filterButtonsEvent = (e) => {
        let input = e.target.parentElement.firstChild
        input.disabled = false
        input.value = "";
       if( e.target.id == "level" ){ 
            input.placeholder = "Filter By Level";
            setInputSettings(["", "level"]);
       }else{
            input.placeholder = "Filter By Position";
            setInputSettings(["", "position"]);
       }
    }

    const inputSettingsEvent = (e) => {
        setInputSettings([e.target.value.toLowerCase(), filter]);
          setNumberOfPages([...employees].filter( employee => employee[filter].toLowerCase().includes(e.target.value.toLowerCase())).length/10)
    }



    return (
        <div id="searchContainer">
            <input onInput={inputSettingsEvent} disabled={true} ></input>
            <button id="level" onClick={filterButtonsEvent}>Filter By Level</button>
            <button id="position" onClick={filterButtonsEvent}>Filter By Position</button>
        </div>
    )
}