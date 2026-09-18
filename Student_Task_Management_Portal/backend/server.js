require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const Task = require("./models/Task");
const User = require("./models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed: ", error.message);
    });

// AUTHENTICATION MIDDLEWARE
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. Please Login."
        });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }
    try {
        const decoded = jwt.verify(token, "mysecretkey");
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
}

// GET ALL TASKS OF LOGGED-IN USER
app.get("/api/tasks", authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.userId
        });
        res.json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to Fetch Tasks"
        });
    }
});

// GET SINGLE TASK
app.get("/api/tasks/:id", authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.userId
        });
        if (!task) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to Fetch Task"
        });

    }
});

// UPDATE TASK STATUS
app.put("/api/tasks/:id", authenticateToken, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({
                _id: req.params.id,
                user: req.userId
            },
            {
                status: req.body.status
            },
            {
                new: true
            }
        );
        if (!task) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }
        res.json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to Update Task"
        });
    }
});

// DELETE TASK
app.delete("/api/tasks/:id", authenticateToken, async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });
        if (!deletedTask) {
            return res.status(404).json({
                message: "Task Not Found"
            });
        }
        res.json(deletedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to Delete Task"
        });

    }
});

// CREATE TASK
app.post("/api/tasks", authenticateToken, async (req, res) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || "Pending",

            // Automatically attach logged-in user
            user: req.userId
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to Create Task"
        });
    }
});

// TEST BACKEND
app.get("/", (req, res) => {
    res.send("Backend is Working!!");

});

// REGISTER
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email Already Registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User Registered Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Registration Failed"
        });
    }
});

// LOGIN
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User Not Found!"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Password"
            });

        }
        const token = jwt.sign({
                userId: user._id
            },
            "mysecretkey",
            {
                expiresIn: "1h"
            }
        );
        res.json({
            message: "Login Successful",
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Login Failed"
        });
    }
});

// START SERVER
app.listen(5000, () => {

    console.log("Server is Running on port 5000");

});