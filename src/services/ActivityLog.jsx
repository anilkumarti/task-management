import { useEffect, useState } from "react";
import fetchActivityLogs from "./fetchActivityLogs";

const ActivityLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      const logsData = await fetchActivityLogs();
      setLogs(logsData);
    };
    getLogs();
  }, []);

  return (
    <div>
      <h2>Activity Log</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.action} - {new Date(log.timestamp?.seconds * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
