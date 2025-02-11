import React, { useState } from "react";
import "./TaskForm.css";
import { useDispatch } from "react-redux";
import { addTask } from "../../../redux/slices/taskSlice";

const TaskForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [characterCount, setCharacterCount] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdTime = new Date().toISOString();
    const newTask = {
      id: Date.now(),
      title,
      description,
      category,
      dueDate,
      status,
      file,
      createdTime
    };
    dispatch(addTask(newTask));
    onClose();
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= 300) {
      setDescription(text);
      setCharacterCount(text.length);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="task-form">
        <div className="form-header">
          <h2>Create Task</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="task-title-input"
            required
          />

          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className="description-input"
          />
          <span className="character-count">{characterCount}/300</span>
          <div className="select">
            <div className="form-group">
              <label>Task Category*</label>
              <div className="category-buttons">
                <button
                  type="button"
                  className={`category-btn ${
                    category === "Work" ? "active" : ""
                  }`}
                  onClick={() => setCategory("Work")}
                >
                  Work
                </button>
                <button
                  type="button"
                  className={`category-btn ${
                    category === "Personal" ? "active" : ""
                  }`}
                  onClick={() => setCategory("Personal")}
                >
                  Personal
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Due on*</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="date-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Task Status*</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="status-select"
                required
              >
                <option value="">Choose</option>
                <option value="TO-DO">To Do</option>
                <option value="IN-PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Attachment</label>
            <div className="file-upload-container">
              <div className="file-upload-area">
                <input
                  type="file"
                  id="file-upload"
                  className="file-input upload-link"
                  onClick={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
                <label htmlFor="file-upload" className="upload-label">
                  Drop your files here or <span className="upload-link">Update</span>
                </label>
                {file && <div className="file-name">{file.name}</div>}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              CANCEL
            </button>
            <button type="submit" className="create-btn">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
