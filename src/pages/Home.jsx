import React, { Suspense, useState } from 'react'

import TaskList from '../components/auth/tasks/TaskList'
const LazyTaskForm= React.lazy(()=> import('../components/auth/tasks/TaskForm' ) )
const Home = () => {
  const[showModal,setShowMoadal]=useState(false);
  const closeHandle=()=> {
    setShowMoadal(prev=> setShowMoadal(!prev))
  }
  return (
    <> 
    { showModal && ( <Suspense> <LazyTaskForm onClose={closeHandle}  />  </Suspense>  )  }
     <TaskList  openAddTask={closeHandle} />
      
     </>
  )
}

export default Home
