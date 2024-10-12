import React, {useState, useEffect} from "react";
import './input.css';



function InputForm(props) {
    //variables for in the form
    const [count, setCount] = useState(0);
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
    const [prior, setPrior] = useState("1");


    //handles when the user submits the form, makes sure there is a date to prevent any null errors
    const submitForm = (event) => {
        event.preventDefault();
        console.log("Form Submit Before app call");

        if(date === "")
          alert("Por favor, Elegir una fecha");
        else{
          setCount(count+1);
          props.handleSubmit({id: count, task: task, date: date, priority: prior});//goes to app.jsx
          console.log("After app call");
          setTask("");
          setPrior("1");
        }
    }

    //general methods to update all user changes
    const updatePrior = (e) => {
        e.preventDefault();
        setPrior(e.target.value);
    }

    const updateTask = (e) => {
        e.preventDefault();
        setTask(e.target.value);
    }

    const updateDate = (e) => {
        e.preventDefault();
        setDate(e.target.value);
    }

    //form filled with all values and inputs needed
    return(
    <>
        <div className="form-box">
        <form>
          <header>Añadir tarea a la lista</header>
          <input type='text' placeholder='Nombre de tarea' onChange={updateTask} value={task} className="form-input"></input>
          <label htmlFor="DueDate">¿Cuándo?: </label>
          <input id='DueDate' type='date' onChange={updateDate} value={date} className="form-input"></input>
          <label htmlFor="prior">Nivel de Prioridad</label>
          <select className='form-select' onChange={updatePrior} value={prior} id="prior">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>

          </select>
          <button className='sbmt-btn' type='submit' onClick={submitForm}>Añadir Tarea</button>

        </form>
      </div>
    </>
    )
}


export default InputForm;