import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { logoutUser} from '../../../services/auth';

const Navbar = () => {
  const {user, loading}=useSelector((state)=> state.auth)
    const dispatch=useDispatch();
  const handleLogout= ()=> {
        dispatch(logoutUser())
    }
    if(loading)
    {
        return <div> Loading...</div>
    }
  return (
    <nav>
      <h2>TaskBuddy</h2>
      <div> 
       <div> Anil</div>
        { user && <button onClick={handleLogout}>  Logout</button>
}
      </div>
    </nav>
  )
}

export default Navbar
