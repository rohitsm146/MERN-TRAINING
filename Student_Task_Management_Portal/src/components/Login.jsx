import { useState } from "react";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event)=>{
        event.preventDefault();

        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        if(data.token){
            localStorage.setItem("token", data.token);
        }
        console.log(data);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email"
                placeholder="Email" 
                value={email}
                onChange={(event) =>setEmail(event.target.value)}
                />

                <br /><br />

                <input type="password"
                placeholder="Password" 
                value={password}
                onChange={(event) =>setPassword(event.target.value)}
                />
                <br /><br />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;