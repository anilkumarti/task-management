import React, { useState } from "react";
import "./KanbanBoard.css";
import UpdateTaskModal from "./UpdateTaskModal";
const KanbanBoard = ({ title, tasks, onDelete, onStatusChange,  onUpdateTask}) => {
    const [openTaskId, setOpenTaskId] = useState(null);
    const [openUpdateModal, setOpenUpdateModal] = useState(null);
    const [draggedTaskId, setDraggedTaskId] = useState(null);
    const currentDate = new Date().toISOString().split("T")[0];
    
  
    const toggleMenu = (taskId) => {
      setOpenTaskId((prev) => (prev === taskId ? null : taskId));
    };
    const openUpdateModalHandler = (taskId) => {
      setOpenUpdateModal((prev) => (prev === taskId ? null : taskId));
    };
  
    
    const handleUpdateTask = (id, updatedTask) => {
    
      onUpdateTask(id, updatedTask);
      
      setOpenUpdateModal(null);
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      return `${day} ${month}, ${year}`;
    };
    const handleDragStart = (e, taskId) => {
      console.log("Dragging Task IDaaaa:", taskId);
      setDraggedTaskId(taskId); // Set the dragged task ID
      e.dataTransfer.setData("text/plain", taskId); // Required for Firefox
    };
  
    const handleDragOver = (e) => {
      e.preventDefault(); 
      e.dataTransfer.dropEffect = "move"
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("text/plain");
    
      if (taskId && onStatusChange) {
        onStatusChange(taskId, title); // Update the task's status to the new column's title
        setDraggedTaskId(null); // Reset the dragged task ID
      }
    };

  return (
    <div className="kanban-column" onDragOver={handleDragOver}
    onDrop={handleDrop}>
      <h2 className={`kanban-title ${title.toLowerCase().replace(" ", "-")}`}>
        {title}
      </h2>
      <div className="kanban-tasks">
        {tasks.length === 0 ? (
          <p className="empty-tasks">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`kanban-task ${draggedTaskId === task.id ? "dragging" : ""}`}   draggable // Make the task draggable
            onDragStart={(e) => handleDragStart(e, task.id)} 
          //  onClick={(e) => { e.stopPropagation();   } }
           
            >
              <div className="first-row"> 
              <h3 className="task-title">{task.title}</h3>

              <div className="task-actions">
                <div className="edit-del-button">
                  {/* Trigger button */}
                  <button
                    onClick={(e) => 
                      { e.stopPropagation();
                        toggleMenu(task.id)}}
                    style={{
                      fontSize: "20px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    &#x22EE;
                  </button>
              {/* updateModal */}
              {openUpdateModal === task.id && (
                <UpdateTaskModal
                  task={task}
                  onClose={() => setOpenUpdateModal(null)}
                  onUpdate={handleUpdateTask}
                />
              )}
                  {/* Dropdown Menu */}
                  {openTaskId === task.id && (
                    <div className="edit-del-dropdown">
                      <div
                        className="edit-btn"
                        onClick={() => openUpdateModalHandler(task.id)}
                      >
                        ✏️ Edit
                      </div>
                      <div
                        className="del-btn"
                        onClick={() => onDelete(task.id)}
                      >
                        🗑️ Delete
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </div>
              <div className="second-row">
              {/* <span className="task-category">{task.category}</span> */}
              <p className="task-category">{task.category}</p>
              <p className="task-due">
                {currentDate === task.dueDate ? "Today" : formatDate(task.dueDate) }
              </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(KanbanBoard);
