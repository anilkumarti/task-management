import React, { useState } from 'react'
import TaskForm from '../components/auth/tasks/TaskForm'
import TaskList from '../components/auth/tasks/TaskList'

const Home = () => {
  const[showModal,setShowMoadal]=useState(true);
  const closeHandle=()=> {
    setShowMoadal(prev=> setShowMoadal(!prev))
  }
  return (
    <div>
    { showModal && <TaskForm onClose={closeHandle} /> }
     <TaskList  openAddTask={closeHandle} />

    </div>
  )
}

export default Home
