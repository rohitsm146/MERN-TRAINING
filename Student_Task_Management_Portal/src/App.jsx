import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import DashBoard from "./components/DashBoard";

function   App() {
  return (
    <div>
      <Navbar />  
      <Welcome />
      <DashBoard />
    </div>
  );
}

export default App;