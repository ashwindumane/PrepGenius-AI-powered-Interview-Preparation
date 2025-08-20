import React from 'react'
import { useUserContext } from '../../context/useUserContext'
import Navbar from './Navbar'
interface DashboardLayoutProps{
    children:React.ReactNode
}
const DashboardLayout:React.FC<DashboardLayoutProps> = ({children}) => {
  
  const {user}=useUserContext()
    return (
    <div className=''>
        
        <Navbar/>
        
        {user && <div>{children}</div>}
        </div>
  )
}

export default DashboardLayout