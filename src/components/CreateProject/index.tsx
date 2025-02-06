import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ServerConfig } from "../../utilities/baseConfig";
interface NewProject{
  setOpenProject: (openProject: boolean)=> void;
}
const NewProject = ({setOpenProject}:NewProject) => {
  const [projectName, setProjectName] = useState("")

  const handleCreateProject = async () => {
    console.log(projectName);
    
    try{
      const response = await fetch(`${ServerConfig.BASE_URL}api/collection/addCollection`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"  // Add this header
        },
        body: JSON.stringify({collectionName: projectName})
      })
      if (response.ok) {
        console.log("Project created successfully");
        setOpenProject(false)
      } else {
        const errorData = await response.json();
        console.error("Error creating project:", errorData);
      }
    }catch(e){
      console.error(e, "error creating project");
      
    }
  }

  return (
    <div className="w-full relative">
      <div className="w-full">
        <p className="text-xl font-[500]">New Project</p>
      </div>
      <div className="w-full my-6">
        <TextField
          id="outlined-basic"
          label="Project Name"
          variant="outlined"
          onChange={(e) => setProjectName(e.target.value)}
          size="small"
          sx={{
            width: "100%",
          }}
        />
      </div>
      <div className="w-full flex justify-end">
          <Button variant="contained" onClick={handleCreateProject}>Create Project</Button>
      </div>
    </div>
  );
};

export default NewProject;
