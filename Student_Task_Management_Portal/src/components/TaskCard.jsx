function TaskCard({ title, description, status }) {
    return (
        <div className="task-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <span>{status}</span>
        </div>
    );
}

export default TaskCard;
