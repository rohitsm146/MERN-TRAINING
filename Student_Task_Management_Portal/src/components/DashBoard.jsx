import StatCard from "./StatCard";
import TaskCard from "./TaskCard";

function DashBoard() {
    const tasks = [
        {
            id:1,
            topic: "Learn React",
            description: "Understanding Components",
            status: "Completed"
        },
        {
            id:2,
            topic: "Learn JavaScript",
            description: "Understanding Async/Await",
            status: "Pending"
        },
        {
            id:3,
            topic: "Learn MongoDB",
            description: "Database",
            status: "Completed"
        },
        {
            id:4,
            topic: "Learn SQL",
            description: "Database",
            status: "Completed"
        }
    ];

    return (
        <main>
            <div className="stats-container">
                <StatCard title="Total-Tasks" value="3" />
                <StatCard title="Completed" value="2" />
                <StatCard title="Pending" value="1" />
            </div>

            <h2>Recent Tasks</h2>

            <div className="tasks-container">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        title={task.topic}
                        description={task.description}
                        status={task.status}
                    />
                ))}
            </div>
        </main>
    );
}

export default DashBoard;
