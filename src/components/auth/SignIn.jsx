// src/components/auth/SignIn.js
import React from "react";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
 
  const handleSignIn = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(loginSuccess(result.user));
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log("sign in failed")
    }
  }; 

  return (
    <div>
      <h1>Task Management App</h1>
      <button onClick={handleSignIn}>Sign In with Google</button>
    </div>
  );
};

export default SignIn;