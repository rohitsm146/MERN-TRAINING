import "./App.css";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Task from "./components/Task";
import TaskDetails from "./components/TaskDetails";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([]);

  // Get tasks from backend
   useEffect(()=>{
    fetch("http://localhost:5000/api/tasks")
    .then((response)=>response.json())
    .then((data)=>{
      setTasks(data);
    });
   },[]);

  // Toggle task status
  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Completed"
                  ? "Pending"
                  : "Completed",
            }
          : task
      )
    );
  }

  // Add a new task
  function addTask(newTask) {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  // Delete a task
  function deleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Dashboard */}
        <Route
          path="/"
          element={
            <DashBoard
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          }
        />

        {/* All Tasks */}
        <Route
          path="/tasks"
          element={
            <Task
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          }
        />

        {/* Task Details */}
        <Route
          path="/tasks/:id"
          element={<TaskDetails tasks={tasks} />}
        />
      </Routes>
    </div>
  );
}

export default App;
