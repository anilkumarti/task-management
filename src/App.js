import React from 'react'
import Auth from './pages/Auth'
import Navbar from './components/auth/common/Navbar'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Auth/>
      <Home/>
     
    </div>
  )
}

export default App
