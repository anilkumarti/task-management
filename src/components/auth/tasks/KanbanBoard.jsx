import React from "react";
import "./KanbanBoard.css";

const KanbanBoard = ({ title, tasks, onDelete, onStatusChange, onEdit }) => {
  return (
    <div className="kanban-column">
      <h2 className={`kanban-title ${title.toLowerCase().replace(" ", "-")}`}>
        {title}
      </h2>
      <div className="kanban-tasks">
        {tasks.length === 0 ? (
          <p className="empty-tasks">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="kanban-task">
              <div className="task-header">
                <span className="task-category">{task.category}</span>
                <div className="task-options">
                  <button className="options-btn">⋮</button>
                  <div className="options-dropdown">
                    <button onClick={() => onEdit(task.id)}>✏ Edit</button>
                    <button onClick={() => onDelete(task.id)} className="delete-btn">
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-due-date">Due: {task.dueDate}</p>
              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                  <option value="Todo">Todo</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
