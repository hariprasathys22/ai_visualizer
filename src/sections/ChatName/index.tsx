import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const ChatName = ({ setOpenAddDetails }: any) => {
  const [chatName, setChatName] = useState<string>("");
  const handleMainChange = (event: any) => {
    setChatName(event.target.value);
  };
  const handleSubmit = () => {
    console.log(chatName, "hshshs");
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
      </div>
    </div>
  );
};

export default ChatName;
