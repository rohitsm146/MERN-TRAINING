import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");
        try {
            const response = await fetch("http://localhost:5000/api/register",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(
                    data.message || "Registration Failed"
                );
                return;
            }
            setMessage(
                "Registration Successful! Redirecting to Login..."
            );
            setName("");
            setEmail("");
            setPassword("");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
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
                <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        required
                    />
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
                        placeholder="Create a password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                    <button type="submit">
                        Register
                    </button>
                </form>
                {message && (
                    <p>{message}</p>
                )}
                {error && (
                    <p>{error}</p>
                )}
                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;