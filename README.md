This is a basic activity tracker. All data will be stored in a database. Frontend in managed through react. Backend managed through Node.js
Make sure you have NPM installed

*All things in quotes are commands to run.   *
*Anything between < -- > is stuff that you name*
Project Setup:
1) Create two folders, one is for backend, other is for frontend

Backend Setup:
2) cd into the backend folder, "cd <filename_backend>"
3) intiliaze the project, "npm init -y"
4) install necessary tools, "npm install express sqlite3 better-sqlite3 cors"
5) Server.js file goes in the backend

Database Setup:
6) run command "sqlite3 <what you want to name your database>.db"
7) next make the table "CREATE TABLE <database name> (
    id INTEGER PRIMARY KEY,
    name TEXT,
    type TEXT
);"
8) exit the command ".exit"

Frontend Setup:
9) cd into fronted folder now, "cd .." -> "cd <filename_frontend>"
10) run this command "npm create vite@latest <filename> -- --template react"
11) some commands should pop up, type in yes and follow the directions

Run the program:
12) Start both servers, react = "npm run dev", node.js="node server.js"
