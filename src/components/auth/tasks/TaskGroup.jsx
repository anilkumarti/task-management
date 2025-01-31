import React, { useState } from "react";
import "./TaskGroup.css";
import UpdateTaskModal from "./UpdateTaskModal";
import "./AddTaskForm";
import AddTaskForm from "./AddTaskForm";
import { Plus, GripVerticalIcon } from "lucide-react";
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
    // Call the onUpdateTask function passed from the parent component
    onUpdateTask(id, updatedTask);
    // Close the update modal
    setOpenUpdateModal(null);
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
                {currentDate === task.dueDate ? "Today" : task.dueDate}
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
              <p className="task-category">{task.category}</p>
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
            <p>{selectedTasks.length} Tasks Selected</p>

            <div className="modal-buttons">
              {/* Status Button with Drop-Up */}
              <div className="dropdown">
                <button
                  className="status-btn"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  Status ⬆
                </button>

                {showStatusDropdown && (
                  <div className="dropdown-menu">
                    <button
                      onClick={() => {
                        selectedTasks.forEach((taskId) =>
                          onStatusChange(taskId, "Todo")
                        ); // Update status of each selected task to "Todo"
                        setShowStatusDropdown(false); // Close the dropdown
                      }}
                    >
                      To-Do
                    </button>
                    <button
                      onClick={() => {
                        selectedTasks.forEach((taskId) =>
                          onStatusChange(taskId, "In-Progress")
                        ); // Update status of each selected task to "In-Progress"
                        setShowStatusDropdown(false); // Close the dropdown
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => {
                        selectedTasks.forEach((taskId) =>
                          onStatusChange(taskId, "Completed")
                        ); // Update status of each selected task to "Completed"
                        setShowStatusDropdown(false); // Close the dropdown
                      }}
                    >
                      Completed
                    </button>
                  </div>
                )}

                {showStatusDropdown && (
                  <div className="dropdown-menu">
                    <button
                      onClick={() => {
                        selectedTasks.forEach((taskId) =>
                          onStatusChange(taskId, "Todo")
                        );
                        setSelectedTasks([]);
                        setShowStatusDropdown(false);
                        setShowStatusDropdown(false);
                      }}
                    >
                      To-Do
                    </button>
                    <button
                      onClick={() => {
                        selectedTasks.forEach((taskId) =>
                          onStatusChange(taskId, "In-Progress")
                        );
                        setSelectedTasks([]);
                        setShowStatusDropdown(false);
                        setShowStatusDropdown(false);
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => {
                        selectedTasks.forEach((taskId) =>
                          onStatusChange(taskId, "Completed")
                        );
                        setSelectedTasks([]);
                        setShowStatusDropdown(false);
                        setShowStatusDropdown(false);
                      }}
                    >
                      Completed
                    </button>
                  </div>
                )}
              </div>

              {/* Delete Button  for Modal...*/}
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

            {/* Close Button */}
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
