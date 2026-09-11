import { useState } from "react";

function AddTask(props) {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
        return;
    }

    const newTask = {
        id: Date.now(),
        topic: title.trim(),
        description: description.trim(),
        status: "Pending"
    };

    console.log("Object", newTask);

    props.onAddTask(newTask);

    // Clear inputs after adding
    setTitle("");
    setDescription("");
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
                placeholder="Enter task title"
            />

            <br />
            <br />

            <label>Current description: </label>

            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
            />

            <br />

            <button type="submit">
                Add Task!
            </button>
        </form>
    </div>
);


}

export default AddTask;