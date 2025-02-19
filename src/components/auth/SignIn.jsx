// src/components/auth/SignIn.js
import React ,{ useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

import { auth, googleProvider } from "../../services/firebase";
import { loginStart, loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import "./SignIn.css"; // Import the CSS file
import taskbudySymbol from "../../assets/icons/taskbudySymbol.webp";


const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading]=useState(false);
//  const user=useSelector(state=>state.auth.user);
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      // If a user is signed in, dispatch loginSuccess
      dispatch(loginSuccess(currentUser));
    } else {
      // If no user is signed in, dispatch loginFailure (optional)
      dispatch(loginFailure("No user is signed in"));
    }
  });

  // Cleanup subscription on unmount
  return () => unsubscribe();
}, [dispatch]);
  const handleSignIn = async () => {
    setLoading(true);
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(loginSuccess(result.user));
      
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log("sign in failed")
    }
    finally {
      setLoading(false);
    }
  }; 


  return (
  
 

    <div className="sign-in-container">
      <div className="title"> 
      <img  loading="lazy" src={taskbudySymbol} alt="TaskBuddy" width="200" height="50" />
         </div>
      <p className="taskbuddy-goal">Streamline your workflow and track progress <br/> effortlessly
         with our all-in-one task management app.</p>
      <button className="sign-in-button" onClick={handleSignIn}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
        { loading ? "Sigining in..." : "Continue with Google"} 
      </button>
    </div>

   
  );
};

export default SignIn;