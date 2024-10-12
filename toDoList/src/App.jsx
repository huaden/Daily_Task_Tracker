import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputForm from './components/inputForm'
import TaskCards from './components/taskCards'
import Card from 'react-bootstrap/Card'
import DoneTaskCard from './components/doneTask'


function App() {
  //variables to store what tasks need to be done and what tasks are already done
  const [taskInfo, setTaskInfo] = useState([]);
  const [taskDone, setTaskDone] = useState([]);
  const [lastTask, setLastTask] = useState([]);

  //node.js server URL
  const URL = "http://localhost:3000/tasks"

  //on page load, get info from database/server
  useEffect(()=>{
    updateTask();
  }, []);


  //updates the two arrays of tasks to do and tasks that are done
  const updateTask = () => {

      const toDoURL = URL + "/toDo";
      const doneURL = URL + "/done";

      //calls the server with an API call and recieves all tasks that still need to be done
      console.log("To Do url: " + toDoURL);
      console.log("Done url: " + doneURL);
      fetch(toDoURL)
      .then((response) => response.json())
      .then((data) => setTaskInfo(data.tasks))
      .catch(error => {
        console.log("Error: ", error);
        setTaskInfo([]);
      })

      //calls the server with an API call and recieves all tasks that are done
      fetch(doneURL)
      .then((response) => response.json())
      .then((data) => setTaskDone(data.tasks))
      .catch(error => {
        console.log("Error: ", error);
        setTaskDone([]);
      })

  }
  const handleNewTaskSubmit = (info) => {

      //calls the server with a POST API call for adding the information from the form into the database
      fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            task: info.task,
            date: info.date,
            priority: info.priority,
            isDone: 0
          })
        }).then(
          (response) => console.log(response)
      ).then( () => updateTask());
  }




  const handleDel = (info) => {
    const urlDelID = `http://localhost:3000/tasks/${info.id}`;

    //deletes the specific task that the user clicked on through an API delete call
    console.log("Url to del: " + urlDelID);
    fetch(urlDelID, {
        method: 'DELETE',
    }).then(response => response.json())
    .then(data => console.log(data))
    .then( () => updateTask())
    .catch(error => console.log("Error", error));
  }

  const handleDone = (info) => {

    //updates the task to be moved into the done section through an API patch call
    const urlID = URL + "/" + info.id;
    fetch(urlID, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
    },
    }).then(response => response.json())
    .then(data => console.log(data))
    .then( () => updateTask())
    .catch(error => console.log("Error", error));
    
  }

  const deleteAll = () => {

    //deletes all tasks if user feels like it
    fetch(URL, {
      method: 'DELETE',
    }).then(response => response.json()).then(data => {console.log(data);
    setLastTask([]);
    setTaskDone([]);
    setTaskInfo([]); 
  });

  }


  //main app html elements, styled with App.css
  //divided into 4 sections: 1) Input form, 2) Tasks to do, 3) Tasks that are done, 4) delete all button
  return (
    <div className='page'>
      <div className='container'>

        <div className='form-section'>
          <InputForm handleSubmit={handleNewTaskSubmit}/>
        </div>


        <div className='task-section toDo-section'>
          <h2>¡¡¡Lista De Tareas!!!</h2>
          {Array.isArray(taskInfo) && taskInfo.map((task) => (
            <TaskCards key={task.id} id={task.id} name={task.task} date={task.date} priority={task.priority} handleDel={handleDel} handleDone={handleDone}/>
          ))}
        </div>

        <div className='task-section done-section'>
          <h2>Tareas que he hecho</h2>
          { Array.isArray(taskInfo) && taskDone.map((task) => (
            <DoneTaskCard key={task.id} id={task.id} name={task.task} date={task.date} priority={task.priority}/>
          ))}
        </div>
        
      </div>
      <div className='delete-button'>
          <button type='submit' onClick={deleteAll} className='del-btn'>Borrar Toda</button>
        </div>
    </div>
  )
}

export default App;
