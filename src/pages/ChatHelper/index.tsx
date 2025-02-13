import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useQueryStore } from "../../store";

const ChatHelper = () => {
  const [queryData, setQueryData] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const { fetchProject, projects } = useQueryStore()

  const handleQueryChange = (e: any) => {
    setQueryInput(e.target.value);
  };
  console.log(projects, "new")

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="w-full h-full p-4 flex justify-center">
      <div className="w-full"></div>
      <div className="w-1/2 h-auto">
        {queryData && <span>{queryData}</span>}
      </div>
      <div className="w-1/2 flex justify-between items-center bottom-10 fixed gap-10">
        <TextField
          size="medium"
          variant="outlined" // Ensure you're using the outlined variant if you want to style the outline
          placeholder="What information do you love to hear today?"
          onChange={(e) => handleQueryChange(e)}
          sx={{
            width: "90%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "40px" // Set your desired border radius here
            }
          }}
        />
        <div className="w-auto">
          <IconButton
            sx={{
              width: "56px",
              height: "56px",
              backgroundColor: "#ef6a36",
              "&:hover": {
                backgroundColor: "#24252d" // Optional: change background on hover
              }
            }}
          >
            <GoArrowRight style={{ fontSize: "50px", color: "#ffffff" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatHelper;
