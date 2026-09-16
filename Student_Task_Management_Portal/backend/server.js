// Bring Express into Node.js
const express = require("express");

// Import CORS middleware
const cors = require("cors");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary task data
const tasks = [
    {
        id: 1,
        title: "Learn React",
        description: "Understanding Components",
        status: "Completed"
    },
    {
        id: 2,
        title: "Learn JavaScript",
        description: "Understanding Variables, Functions",
        status: "Pending"
    }
];

// GET all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// GET one task
app.get("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found!"
        });
    }

    res.json(task);
});

// UPDATE task
app.put("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = tasks.find((task) => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found!"
        });
    }

    task.status = req.body.status;

    res.json(task);
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const taskIndex = tasks.findIndex(
        (task) => task.id === id
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            message: "Task not found!"
        });
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({
        message: "Task deleted successfully!",
        task: deletedTask[0]
    });
});

// CREATE task
app.post("/api/tasks", (req, res) => {
    const newTask = {
        id: tasks.length > 0
            ? Math.max(...tasks.map((task) => task.id)) + 1
            : 1,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || "Pending"
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// API route for testing backend
app.get("/", (req, res) => {
    res.send("Backend is Working!!");
});

// Start server
app.listen(5000, () => {
    console.log("Server is Running on port 5000");
});