import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState, useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );
    useEffect(() => {
        if (!isLoggedIn) {
            setTasks([]);
            return;
        }
        const token =
            localStorage.getItem("token");
        fetch("http://localhost:5000/api/tasks",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch tasks"
                    );
                }
                return response.json();
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setTasks([]);
            });
    }, [isLoggedIn]);
    return (
        <div>
            {isLoggedIn && (
                <Navbar
                    setIsLoggedIn={setIsLoggedIn}
                />
            )}
            <Routes>
                {/* Register */}
                <Route
                    path="/register"
                    element={
                        isLoggedIn
                            ? <Navigate to="/" replace />
                            : <Register />
                    }
                />
                {/* Login */}
                <Route
                    path="/login"
                    element={
                        isLoggedIn
                            ? <Navigate to="/" replace />
                            : (
                                <Login
                                    setIsLoggedIn={
                                        setIsLoggedIn
                                    }
                                />
                            )
                    }
                />
                {/* Dashboard */}
                <Route
                    path="/"
                    element={
                        isLoggedIn
                            ? (
                                <Dashboard
                                    tasks={tasks}
                                    setTasks={setTasks}
                                />
                            )
                            : (
                                <Navigate
                                    to="/register"
                                    replace
                                />
                            )
                    }
                />
                {/* Tasks */}
                <Route
                    path="/tasks"
                    element={
                        isLoggedIn
                            ? <Tasks tasks={tasks} />
                            : (
                                <Navigate
                                    to="/register"
                                    replace
                                />
                            )
                    }
                />
                {/* Task Details */}
                <Route
                    path="/tasks/:id"
                    element={
                        isLoggedIn
                            ? <TaskDetails />
                            : (
                                <Navigate
                                    to="/register"
                                    replace
                                />
                            )
                    }
                />
                {/* Unknown URL */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to={
                                isLoggedIn
                                    ? "/"
                                    : "/register"
                            }
                            replace
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;