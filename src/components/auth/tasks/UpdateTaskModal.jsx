import React, { useState } from "react";
import "./UpdateTaskModal.css";

const UpdateTaskModal = ({ task, onUpdate, onClose }) => {
  const [taskDetails, setTaskDetails] = useState({
    name: task.name,
    description: task.description,
    category: task.category,
    dueDate: task.dueDate,
    status: task.status,
    attachment: task.attachment || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTaskDetails((prevDetails) => ({ ...prevDetails, attachment: file }));
  };

  const handleUpdate = () => {
    onUpdate(taskDetails);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Task</h2>
        <textarea
          name="description"
          value={taskDetails.description}
          onChange={handleChange}
        />
        
        <div className="category-selector">
          <button 
            className={taskDetails.category === "Work" ? "active" : ""}
            onClick={() => setTaskDetails({ ...taskDetails, category: "Work" })}
          >
            Work
          </button>
          <button 
            className={taskDetails.category === "Personal" ? "active" : ""}
            onClick={() => setTaskDetails({ ...taskDetails, category: "Personal" })}
          >
            Personal
          </button>
        </div>

        <input
          type="date"
          name="dueDate"
          value={taskDetails.dueDate}
          onChange={handleChange}
        />

        <select name="status" value={taskDetails.status} onChange={handleChange}>
          <option value="TO-DO">TO-DO</option>
          <option value="IN-PROGRESS">IN-PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>

        <input type="file" onChange={handleFileChange} />

        {taskDetails.attachment && (
          <div className="file-preview">
            <img src={URL.createObjectURL(taskDetails.attachment)} alt="Preview" />
            <button onClick={() => setTaskDetails({ ...taskDetails, attachment: null })}>Remove</button>
          </div>
        )}

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="update-btn" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;