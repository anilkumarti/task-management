// src/services/auth.js
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { loginStart, loginSuccess, loginFailure, logout } from "../redux/slices/authSlice"; // Import Redux actions

const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = () => async (dispatch) => {
  dispatch(loginStart()); // Set loading state to true
  try {
    const result = await signInWithPopup(auth, googleProvider); // Sign in with Google
    dispatch(loginSuccess(result.user)); // Dispatch success action with user data
  } catch (error) {
    dispatch(loginFailure(error.message)); // Dispatch failure action with error message
  }
};

// Logout function
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth); 
    dispatch(logout()); 
  } catch (error) {
    dispatch(loginFailure(error.message)); 
  }
};


export const listenToAuthChanges = () => (dispatch) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(loginSuccess(user)); 
    } else {
      dispatch(logout()); 
    }
  });
};