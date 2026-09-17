import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard(props) {

    async function toggleTask(id){
        const task = props.tasks.find((task)=>task._id === id);
        const newStatus = task.status ==="Completed"
         ? "Pending" : "Completed";
        
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`
            , {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status:newStatus
            })
        });

        const updatedTask = await response.json();

        props.setTasks(
            props.tasks.map((task) => {
                if(task._id === id){
                    return updatedTask;
                }
                return task;
            })
        );
    }

    function addTask(newTask){
        props.setTasks([...props.tasks, newTask]);
    }

    async function deleteTask(id){
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "DELETE"
            });

            const deletedTask = await response.json();
        props.setTasks(
            props.tasks.filter((task)=>task._id !== deletedTask._id)
        );
    }

    return (
        <main>
        
            <div className="stats-container">
                <StatCard title="Total Tasks" value={props.tasks.length}/>
                <StatCard title="Completed" value={props.tasks.filter((task)=>task.status==="Completed").length}/>
                <StatCard title="Pending" value={props.tasks.filter((task)=>task.status==="Pending").length}/>
                
            </div>

            <AddTask  onAddTask={addTask}/>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {props.tasks.map((task)=>(
                    <TaskCard 
                        key={task._id} 
                        id ={task._id}
                        title={task.title} 
                        description={task.description} 
                        status={task.status}
                        onToggle={()=>toggleTask(task._id)} 
                        onDelete={()=>deleteTask(task._id)}
                    />
                ))};
            </div>

        </main>
    );
}

export default Dashboard;