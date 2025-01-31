import { db } from "./firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

const fetchActivityLogs = async () => {
  try {
    const q = query(collection(db, "activity_logs"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const logs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return logs;
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    return [];
  }
};
