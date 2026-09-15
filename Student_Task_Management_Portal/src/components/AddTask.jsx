import { useState } from "react";

function AddTask(props){
    const [title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        const newTask = {
            id:Date.now(),
            title: title,
            description: description,
            status: "Pending"
        };
        try{
            const response = await fetch("http://localhost:5000/api/tasks", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(newTask)
        });

        const data = await response.json();
        props.onAddTask(data);
        }catch(error){
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
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <br /><br />
                <label>Add Description: </label>
                <input 
                    type="text" 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <br /><br />
                <button type="submit">Add Task!</button>
            </form>
        </div>
    );
}
export default AddTask;