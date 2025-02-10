// src/components/auth/SignIn.js
import React from "react";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";

import { auth, googleProvider } from "../../services/firebase";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import "./SignIn.css"; // Import the CSS file

import { ReactComponent as TaskbudySymbol } from "../../assets/icons/taskbudySymbol.svg";


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
    <div className='main-container' > 
 

    <div className="sign-in-container">
      <div className="title"> <TaskbudySymbol/></div>
      <p className="taskbuddy-goal">Streamline your workflow and track progress <br/> effortlessly
         with our all-in-one task management app.</p>
      <button className="sign-in-button" onClick={handleSignIn}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
        Continue with Google
      </button>
    </div>

    </div>
  );
};

export default SignIn;