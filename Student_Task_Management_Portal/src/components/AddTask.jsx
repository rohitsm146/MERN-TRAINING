import { useState } from "react";

function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const newTask = {
            title: title,
            description: description,
            status: "Pending"
        };
        try {
            const response = await fetch("http://localhost:5000/api/tasks",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(newTask)
                }
            );
            const data = await response.json();
            if (!response.ok) {
                console.log(data.message);
                return;
            }
            props.onAddTask(data);
            setTitle("");
            setDescription("");
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Add Title: </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />
                <br />
                <br />
                <label>Add Description: </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    required
                />
                <br />
                <br />
                <button type="submit">
                    Add Task!
                </button>
            </form>
        </div>
    );
}

export default AddTask;