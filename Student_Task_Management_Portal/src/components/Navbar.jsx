import { Link, useNavigate } from "react-router-dom";

function Navbar({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");

    };
    return (
        <nav>
            <h2>
                Student Task Portal
            </h2>
            <div className="nav-links">
                <Link to="/">
                    Home
                </Link>
                <Link to="/tasks">
                    Tasks
                </Link>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;