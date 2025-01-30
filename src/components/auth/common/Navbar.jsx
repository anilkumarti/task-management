import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../services/auth';
import './Navbar.css'
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      <h2>TaskBuddy</h2>
      <div className="user-info">
        
        {user && (
          <>  
          <div> 
            <img 
              src={user.photoURL || '/default-profile.png'} 
              alt="User"
              className="user-image"
            />
            <p className="user-name">{user.displayName || 'Anonymous'}</p>
            </div>
            <button className='btn' onClick={handleLogout}> <LogOut/>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
