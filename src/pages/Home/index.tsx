import React from 'react'
import Sidebar from '../../sections/Sidebar'

const Home = () => {
  return (
    <div className='w-full h-screen bg-layout flex'>
        <div className='md:w-[270px] w-full h-full'>
            <Sidebar />
        </div>
    </div>
  )
}

export default Home