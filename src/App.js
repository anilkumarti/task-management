import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './pages/Auth';
//import Navbar from './components/auth/common/Navbar';
import Home from './pages/Home';
import { loginSuccess } from './redux/slices/authSlice';
import Loading from './pages/Loading';
 const LazyNavbar=React.lazy(()=> import('./components/auth/common/Navbar'))
const App = () => {
  // Use Redux state to check if the user is signed in
  const { user} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSignIn = (userData) => {
    dispatch(loginSuccess(userData)); // Dispatch user data after successful login
  };

  return (
    <Suspense fallback={<Loading/>}>
    
      {!user ? (
        <Auth onSignIn={handleSignIn} />
      ) : (
        <>
          <LazyNavbar/>
          <Home/>
        </>
      )}
    </Suspense>
  );
};

export default App;
