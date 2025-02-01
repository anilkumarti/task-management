import { db } from "./firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

const fetchActivityLogs = async (taskId) => {
  try {
    const q = query(
      collection(db, "activity_logs"),
      where("extraInfo.taskId", "==", taskId),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const logs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return logs;
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return [];
  }
};

export default fetchActivityLogs;