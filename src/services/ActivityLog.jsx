import { useEffect, useState } from "react";
import fetchActivityLogs from "./FetchActivitylog";
import "./ActivityLog.css"; // Import the CSS file

const ActivityLog = ({ taskId }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const logsData = await fetchActivityLogs(taskId);
        setLogs(logsData);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      }
    };
    getLogs();
  }, [taskId]);

  // Function to render activity text based on log type
  const renderActivityText = (log) => {
    switch (log.type) {
      case "created":
        return "You created this task";
      case "statusChange":
        return `You changed status from ${log.froStatus} to ${log.toStatus}`;
      case "fileUpload":
        return "You uploaded a file";
      default:
        return "Unknown activity";
    }
  };

  return (
    <div className="activity-container">
      {logs.length === 0 ? (
        <p className="no-activity">No activity logs available.</p>
      ) : (
        <div className="activity-list">
          <h3 className="activity-heading">Activity</h3>
          {logs.map((log) => (
            <div key={log.id} className="activity-item">
              <p className="activity-text">{renderActivityText(log)}</p>
              <p className="activity-time">
                {log.timestamp?.seconds
                  ? new Date(log.timestamp.seconds * 1000).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                  : "Unknown time"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityLog;