import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import DashBoard from "./components/DashBoard";
import Task from "./components/Task";
import{Routes, Route} from "react-router-dom"

function   App() {
  return (
    <div>
      <Navbar />  
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;