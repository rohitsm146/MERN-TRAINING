import "./App.css";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";
import Task from "./components/Task";
import TaskDetails from "./components/TaskDetails";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [tasks, setTasks] = useState([
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
    {
      id: 3,
      topic: "Learn MongoDB",
      description: "Database",
      status: "Completed",
    },
    {
      id: 4,
      topic: "Learn SQL",
      description: "Database",
      status: "Completed",
    },
  ]);

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

  function addTask(newTask) {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function deleteTask(id) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
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

        <Route
          path="/tasks/:id"
          element={<TaskDetails tasks={tasks} />}
        />
      </Routes>
    </div>
  );
}

export default App;
