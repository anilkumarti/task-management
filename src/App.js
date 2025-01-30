import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth';
import Navbar from './components/auth/common/Navbar';
import Home from './pages/Home';
import { loginSuccess } from './redux/slices/authSlice';

const App = () => {
  // Use Redux state to check if the user is signed in
  const { user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignIn = (userData) => {
    dispatch(loginSuccess(userData)); // Dispatch user data after successful login
  };

  return (
    <div>
    
      {!user ? (
        <Auth onSignIn={handleSignIn} />
      ) : (
        <>
          <Navbar />
          <Home />
        </>
      )}
    </div>
  );
};

export default App;
