// import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/interview-prep/Landing'
import Dashboard from './pages/home/Dashboard'
import InterviewPrep from './pages/interview-prep/InterviewPrep'
import {Toaster} from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <>
    <div >
      <ToastContainer position="top-right" autoClose={3000}/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        {/* <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/> */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/interview-prep/:sessionId' element={<InterviewPrep/>}/>
      </Routes>
      </BrowserRouter>

      <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize:"13px"
        }
      }}
      />
    </div>
    </>
  )
}

export default App