import React, { useState } from "react";
import "./TaskGroup.css";
import UpdateTaskModal from "./UpdateTaskModal";
import "./AddTaskForm";
import AddTaskForm from "./AddTaskForm";
import { Plus, GripVerticalIcon, CheckSquare,X, } from "lucide-react";
import { ReactComponent as CheckmarkIcon } from "../../../assets/icons/checkmark-green.svg";
import { ReactComponent as CheckmarkGrey } from "../../../assets/icons/checkmark-grey.svg";
const TaskGroup = ({
  title,
  onUpdateTask,

  tasks,
  onDelete,
  onStatusChange,
}) => {
  const [openTaskId, setOpenTaskId] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  const [selectedTasks, setSelectedTasks] = useState([]); // Track selected tasks for modal
  const [showStatusModal, setShowStatusModal] = useState(false); // Controls modal visibility
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const toggleMenu = (taskId) => {
    setOpenTaskId((prev) => (prev === taskId ? null : taskId));
  };
  const openUpdateModalHandler = (taskId) => {
    setOpenUpdateModal((prev) => (prev === taskId ? null : taskId));
  };

  const handleAddTask = (newTask) => {
    setShowAddForm(false);
  };

  const handleCheckboxChange = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
    setShowStatusModal(true);
  };
  const handleUpdateTask = (id, updatedTask) => {
    
    onUpdateTask(id, updatedTask);
    
    setOpenUpdateModal(null);
  };

  const handleStatusChange = (status) => {
    selectedTasks.forEach((taskId) => onStatusChange(taskId, status));
    setSelectedTasks([]); // Clear selected tasks
    setShowStatusDropdown(false); // Close the dropdown  
    setShowStatusModal(false); // Close the modal
  };
  const toggleSelectAllTasks = () => {
    console.log("Selected Tasks Before:", selectedTasks);
    console.log("Total Tasks:", tasks.length);

    if (selectedTasks.length === tasks.length) {
      // If all tasks are selected, deselect all
      setSelectedTasks([]);
      console.log("Deselected All Tasks");
    } else {
      // Otherwise, select all tasks
      setSelectedTasks(tasks.map((task) => task.id));
      console.log("Selected All Tasks");
    }

    console.log("Selected Tasks After:", selectedTasks);
  };
  const closeModal = () => {
    setSelectedTasks([]); // Clear selected tasks
    setShowStatusModal(false); // Close the modal
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <>
      <div className="task-group">
        <h3 className={`task-group-title ${title.toLowerCase()}`}>
          {title} ({tasks.length})
        </h3>

        {title === "Todo" && !showAddForm && (
          <div
            className="add-task-trigger"
            onClick={() => setShowAddForm(true)}
          >
            <Plus /> Add Task
          </div>
        )}

        {/* add task in Todo will be open  */}

        {showAddForm && (
          <AddTaskForm
            onAdd={handleAddTask}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        {/* items of each task row */}

        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="task-item">
              {/* Checkbox */}
              <div>
                <input
                  type="checkbox"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                <GripVerticalIcon />
                {task.status === "Completed" ? (
                  <CheckmarkIcon width={24} height={24} />
                ) : (
                  <CheckmarkGrey width={24} height={24} />
                )}
              </div>

              {/* updateModal */}
              {openUpdateModal === task.id && (
                <UpdateTaskModal
                  task={task}
                  onClose={() => setOpenUpdateModal(null)}
                  onUpdate={handleUpdateTask}
                />
              )}

              <p className="task-due">
                {currentDate === task.dueDate ? "Today" : formatDate(task.dueDate)}
              </p>
              <h4>{task.title}</h4>
              <p className="task-category">{task.category}</p>

              <div className="task-status-select">
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                  className="task-status"
                >
                  <option value="Todo">To-Do</option>
                  <option value="In-Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="task-actions">
                <div className="edit-del-button">
                  {/* Trigger button */}
                  <button
                    onClick={() => toggleMenu(task.id)}
                    style={{
                      fontSize: "20px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    &#x22EE;
                  </button>

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
          ))
        ) : (
          <p className="no-tasks">No tasks available.</p>
        )}
      </div>

      {/* code for showModal */}
      {showStatusModal && (
        <div className="status-modal">
          <div className="modal-content">
            <div className="task-selected"> 
            <span>{selectedTasks.length} Tasks Selected</span>  
            <X onClick={closeModal} style={{ cursor: "pointer"  }} /> 
            </div> 
            <div className="select-all-buttons">
            <CheckSquare
                onClick={toggleSelectAllTasks}
                style={{ cursor: "pointer", color: selectedTasks.length === tasks.length ? "green" : "grey" }} // Change color based on selection
              />
            </div>

            <div className="modal-buttons">
              <div className="dropdown">
                <button
                  className="status-btn"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  Status
                </button>

                {showStatusDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleStatusChange("Todo")}>
                      To-Do
                    </button>
                    <button onClick={() => handleStatusChange("In-Progress")}>
                      In Progress
                    </button>
                    <button onClick={() => handleStatusChange("Completed")}>
                      Completed
                    </button>
                  </div>
                )}
              </div>

              <button
                className="delete-btn"
                onClick={() => {
                  selectedTasks.forEach((taskId) => onDelete(taskId));
                  setSelectedTasks([]);
                  setShowStatusModal(false);
                }}
              >
                Delete
              </button>
            </div>

            <button
              className="close-btn"
              onClick={() => setShowStatusModal(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskGroup;
