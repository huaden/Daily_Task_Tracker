//all imports/requires needed for server with node.js
const express = require('express');
const Database = require("better-sqlite3");
const cors = require("cors");
const toDoList = express();
const port = 3000;


//connects to database and prepares tools that were brought in
const db = new Database("./tasks.db");
toDoList.use(express.json());
toDoList.use(cors());



//GET endpoint for obtaining all task info from database using SQL
toDoList.get("/tasks", (req, res) => {
    try{
        const sql = "SELECT * FROM tasks";
        const rows = db.prepare(sql).all();
        res.status(200).json({tasks: rows});
    }
    catch (error){
        console.log(error);
        res.status(404).json({message: 'Error getting tasks to do'});
    }
});

//GET endpoint for obtaining all task info about tasks that are done from database using SQL
toDoList.get("/tasks/done", (req, res) => {
    try{
        const sql = "SELECT * FROM tasks WHERE isDone = ?";
        const rowsDone = db.prepare(sql).all(1);
        res.status(200).json({tasks: rowsDone});
    }
    catch (error){
        console.log(error);
        res.status(404).json({message: 'Error getting tasks to do'});
    }
});

//GET endpoint for obtaining all task info about tasks that needed to do from database using SQL
toDoList.get("/tasks/toDo", (req, res) => {
    try{
        const sql = "SELECT * FROM tasks WHERE isDone = ?"
        const rowsToDo = db.prepare(sql).all(0);
        res.status(200).json({tasks: rowsToDo});
    }
    catch (error){
        console.log(error);
        res.status(404).json({message: 'Error getting tasks to do'});
    }
});




//PATCH endpoint for updating table when user wants to change a task from incomplete to complete, uses parameters from url
toDoList.patch("/tasks/:id", (req, res) => {
    const { id } = req.params;
    
    const sql = "UPDATE tasks SET isDone = 1 WHERE id = ?";
    const result = db.prepare(sql).run(id);

    if(result.changes > 0){
        res.status(200).json({message: `Task number ${id} has been marked complete`});
    }
    else{
        res.status(404).json({message: 'Task not Found'});
    }
});


//POST endpoint for adding to the database from all user supplied input, all tasks are set as not done at first
toDoList.post("/tasks", (req, res) => {
    const { task, date, priority } = req.body;

    if(task === undefined || date === undefined || priority === undefined){
        return res.status(400).json({
            message: 'Please provide all info'
        });
    }

    const sql = "INSERT INTO tasks (task, date, priority, isDone) VALUES(?, ?, ?, ?)";
    const result = db.prepare(sql).run(task, date, priority, 0);

    if(result.changes > 0){
        res.status(201).json({
            message: 'Task added successfully'
        });
    }
    else{
        res.status(500).json({message: 'Failed to add task'});
    }
})


//DELETE endpoint that deletes all tasks from the database
toDoList.delete("/tasks", (req, res) => {
    try {
        const sql = "DELETE FROM tasks";
        const result = db.prepare(sql).run(); 

        if (result.changes > 0) {
            res.status(200).json({ message: "All tasks deleted successfully" });
        } else {
            res.status(404).json({ message: "No tasks found to delete" });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting tasks" });
    }
});


//DELETE endpoint that deletes a specific task from the database
toDoList.delete("/tasks/:id", (req, res) => {
    try {
        const { id } = req.params;

        const sql = "DELETE FROM tasks WHERE id = ?";
        const result = db.prepare(sql).run(id);

        if (result.changes > 0) {
            res.status(200).json({ message: `Task #${id} deleted successfully` });
        } else {
            res.status(404).json({ message: "No tasks found to delete" });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error while deleting tasks" });
    }
});




//makes sure the server is listening for incoming requests
toDoList.listen(port, () => {
    console.log(`App is running on PORT ${port}`);
});

