import { db } from "./firebase"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const logActivity = async (userId, action, extraInfo = {}) => {
  try {
    await addDoc(collection(db, "activity_logs"), {
      userId,
      action,
      extraInfo,
      timestamp: serverTimestamp(), 
    });
    console.log("Activity Logged Successfully");
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

export default logActivity;
