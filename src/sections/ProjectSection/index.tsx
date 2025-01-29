import React from 'react'
import SearchBar from '../../components/SearchBar'
import ProjectTable from '../../components/ProjectTable'


const ProjectSection = () => {
  return (
    <div className='w-full h-full py-6 px-8'>
        <div className='border-1 border-[#e4e4e4] p-4 rounded-lg'>
            <SearchBar />
        </div>
        <div className='w-full py-4'>
           <ProjectTable />
        </div>
    </div>
  )
}

export default ProjectSection