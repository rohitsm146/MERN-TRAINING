import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const response = await fetch("http://localhost:5000/api/login",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(
                    data.message || "Login Failed"
                );
                return;
            }

            if (data.token) {
                localStorage.setItem(
                    "token",
                    data.token
                );
                setIsLoggedIn(true);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            setError(
                "Unable to connect to server"
            );
        }
    };
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                    <button type="submit">
                        Login
                    </button>
                </form>
                {error && (
                    <p>{error}</p>
                )}
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;