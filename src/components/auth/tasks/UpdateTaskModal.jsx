import React, { useState, useEffect } from "react";
import "./UpdateTaskModal.css";
import logActivity from "../../../services/logActivity";
import ActivityLog from "../../../services/ActivityLog";
// import { useDispatch } from "react-redux";
// import { updateTask } from "../../../redux/slices/taskSlice";
const UpdateTaskModal = ({ task, onClose, onUpdate }) => {
  // const dispatch=useDispatch();
  const [activeTab, setActiveTab] = useState("update");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const [taskDetails, setTaskDetails] = useState({
    title: task?.title || "",
    description: task?.description || "",
    category: task?.category || "Work",
    dueDate: task?.dueDate || "",
    status: task?.status || "TO-DO",
    attachment: task?.attachment || null,
  });

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTaskDetails((prevDetails) => ({ ...prevDetails, attachment: file }));
  };

  const handleUpdate = () => {
    console.log("Updating task with details: in Updatetaskmodal", taskDetails);
    onUpdate(task.id, taskDetails);
    logActivity(
      "user_123",
      `Updated Task ${task.id} to ${taskDetails.status}`,
      {
        taskId: task.id,
        newStatus: taskDetails.status,
      }
    );
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Conditionally render tabs only in mobile view */}
        {isMobile && (
          <div className="modal-tabs">
            <button
              className={`tab-button ${activeTab === "update" ? "active" : ""}`}
              onClick={() => setActiveTab("update")}
            >
             DETAILS
            </button>
            <button
              className={`tab-button ${activeTab === "log" ? "active" : ""}`}
              onClick={() => setActiveTab("log")}
            >
              ACTIVITY
            </button>
          </div>
        )}

        <div className="modal-content">
          {/* Show both sections in desktop view, toggle in mobile view */}
          {(!isMobile || activeTab === "update") && (
            <div className="task-details-form">
              <input
                type="text"
                name="title"
                value={taskDetails.title}
                onChange={handleChange}
                placeholder="Task title"
              />
              <textarea
                name="description"
                value={taskDetails.description}
                onChange={handleChange}
                placeholder="Task description"
              />

              <div className="toolbar">
                <button>
                  <b>B</b>
                </button>
                <button>
                  <i>I</i>
                </button>
                <button>&bull; List</button>
              </div>

              <div className="category-selector">
                <button
                  className={taskDetails.category === "Work" ? "active" : ""}
                  onClick={() =>
                    setTaskDetails({ ...taskDetails, category: "Work" })
                  }
                >
                  Work
                </button>
                <button
                  className={
                    taskDetails.category === "Personal" ? "active" : ""
                  }
                  onClick={() =>
                    setTaskDetails({ ...taskDetails, category: "Personal" })
                  }
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

              <select
                name="status"
                value={taskDetails.status}
                onChange={handleChange}
              >
                <option value="TO-DO">TO-DO</option>
                <option value="IN-PROGRESS">IN-PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>

              <input
                type="file"
                accept="image/*,.pdf,.docx"
                onChange={handleFileChange}
              />

              {taskDetails.attachment && (
                <div className="file-preview">
                  <img
                    src={URL.createObjectURL(taskDetails.attachment)}
                    alt="Preview"
                  />
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(taskDetails.attachment);
                      setTaskDetails((prevDetails) => ({
                        ...prevDetails,
                        attachment: null,
                      }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          )}

          {(!isMobile || activeTab === "log") && (
            <div className="activity-log">
              <ActivityLog taskId={task.id} />
            </div>
          )}
        </div>

        {/* Conditionally render buttons only in mobile view */}
        {/* {isMobile && (
          <div className="mobile-actions">
            <button
              className="activity-log-btn"
              onClick={() => setActiveTab("log")}
            >
              Activity Log
            </button>
            <button
              className="update-btn"
              onClick={() => setActiveTab("update")}
            >
              Update Task
            </button>
          </div>
        )} */}

        {/* Always show Cancel and Update buttons */}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTaskModal;