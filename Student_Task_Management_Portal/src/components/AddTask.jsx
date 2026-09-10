import { useState } from "react";

function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    function handleSubmit(e){
        e.preventDefault();
        const newTask={
            id:Date.now(),
            title:title,
            description:description,
            status:"Pending"
        };
        console.log("Object",newTask);
        props.onAddTask(newTask)
    }

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Add Title: </label>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            
            />
            <br></br>
            <br></br>

            
            <label>Current description: </label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                
            />
            <br></br>
            <button type="Submit">Add Task!</button>
            
            </form>   
        </div>
    );
}

export default AddTask;