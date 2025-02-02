// src/components/auth/SignIn.js
import React from "react";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { auth, googleProvider } from "../../services/firebase";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import "./SignIn.css"; // Import the CSS file
import circlesBg from "../../assets/icons/circles_bg.png"; 
import taskImage from "../../assets/TaskList.png"; 
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
  const handleTaskImageClick = () => {
    toast.info("Please log in first!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    <div className="sample-image"   style={{
    backgroundImage: `url(${circlesBg})`,
  
    height: "110vh",
    backgroundSize: "cover", 

  }}> 
  <div className="task-img" >  <img src={taskImage} alt="Task Image" onClick={handleTaskImageClick} /> </div>
  

  </div>
  <ToastContainer />
    </div>
  );
};

export default SignIn;