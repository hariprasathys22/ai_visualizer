import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useQueryStore } from "../../store";
import DropDownComponent from "../../components/DropDown";
import { ServerConfig } from "../../utilities/baseConfig";

const ChatHelper = () => {
  const [queryData, setQueryData] = useState("");
  const [dropDownProject, setDropDownProject] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const { fetchProject, projects } = useQueryStore();

  const handleQueryChange = (e: any) => {
    setQueryInput(e.target.value);
  };

  const handleProjectChange = (event: any) => {
    setDropDownProject(event.target.value);
  };

  const fetchQueryResponse = async () => {
    const response = await fetch(`${ServerConfig.BASE_URL}api/querytext/${dropDownProject}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", // Add this header
      },
      body: JSON.stringify({query: queryInput})
    })
    const data = await response.json()
    if(response.ok){
      setQueryData(data.message)
      console.log(data);
      
    }

  }

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="w-full h-full p-4 ">
      <div className="w-1/4 relative">
        <DropDownComponent
          handleChange={handleProjectChange}
          content={projects}
          value={dropDownProject} // <-- Pass the state you want to bind
          label="Select Project"
        />
      </div>
      <div className="w-1/2 h-auto">
        {queryData && <span>{queryData}</span>}
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 flex justify-center items-center bottom-10 fixed gap-10">
          <TextField
            size="medium"
            variant="outlined" // Ensure you're using the outlined variant if you want to style the outline
            placeholder="What information do you love to hear today?"
            onChange={(e) => handleQueryChange(e)}
            sx={{
              width: "90%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "40px", // Set your desired border radius here
              },
            }}
          />
          <div className="w-auto">
            <IconButton
              sx={{
                width: "56px",
                height: "56px",
                backgroundColor: "#ef6a36",
                "&:hover": {
                  backgroundColor: "#24252d", // Optional: change background on hover
                },
              }}
              onClick={fetchQueryResponse}
            >
              <GoArrowRight style={{ fontSize: "50px", color: "#ffffff" }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHelper;
