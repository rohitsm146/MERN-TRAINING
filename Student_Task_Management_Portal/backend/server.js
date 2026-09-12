//Bring express in Node.js
const express = require("express")

//installing cors middelware
const cors = require("cors");

//Create express app using what we imported
const app = express();

//use cors middleware to handle requests
app.use(cors());
const tasks =[
    {
      id: 1,
      topic: "Learn React",
      description: "Understanding Components",
      status: "Completed",
    },
    {
      id: 2,
      topic: "Learn JavaScript",
      description: "Understanding Async/Await",
      status: "Pending",
    },
  ];
app.get("/api/tasks",(req, res) =>{
    res.json(tasks);
});
//API Route (Testing Backend)
app.get("/", (req, res) => {
    res.send("Backend is Working!!!")
});

// Start the server and listen to port 5000
app.listen(5000, () => {
    console.log("Server is Running on port 5000");
});