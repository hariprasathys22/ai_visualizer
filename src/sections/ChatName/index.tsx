import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ServerConfig } from "../../utilities/baseConfig";

const ChatName = ({ setOpenAddDetails, fetchChatHistory }: any) => {
  const [chatName, setChatName] = useState<string>("");
  const handleMainChange = (event: any) => {
    setChatName(event.target.value);
  };
  const handleSubmit = async () => {
    const res = await fetch(`${ServerConfig.BASE_URL}api/chatHistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({chatName})
    })
    if(!res.ok) {
      console.log("error creating chat")
    }else{
      await fetchChatHistory()
    }
    setOpenAddDetails(false);
  };

  return (
    <div className="w-full">
      <div className="w-full relative flex flex-col justify-center items-center">
        <TextField
          id="outlined-basic"
          label="Chat Name"
          placeholder="Enter Chat Name"
          onChange={handleMainChange}
          variant="outlined"
          sx={{
            width: "100%",
          }}
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outlined" onClick={handleSubmit}>
          Create
        </Button>
        <Button variant="outlined" onClick={() => setOpenAddDetails(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ChatName;
