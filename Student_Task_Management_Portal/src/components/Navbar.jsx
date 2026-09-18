import { Link } from "react-router-dom";

function Navbar() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        console.log("Logged Out Succesfully");
    }
    return (
        <nav>
            <h2>Student Task Portal</h2>

            <div className="nav-links">
                <Link to={"/"}>Home</Link>
                <Link to={"/tasks"}> Tasks</Link>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;