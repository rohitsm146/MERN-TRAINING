import { useState } from "react";

function Register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleRegister = async(event) =>{
        event.preventDefault();

        const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event)=> setName(event.target.value)}
                />
                <br /><br />
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event)=> setEmail(event.target.value)}
                />
                <br /><br />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                />
                <br /><br />
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );    
}

export default Register;