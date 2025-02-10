import { Button, TextField } from "@mui/material";
import React from "react";

const PayloadSection = () => {
  return (
    <div className="w-full">
      <div className="w-full relative flex justify-between items-center">
        <TextField
          id="outlined-basic"
          label="Key"
          variant="outlined"
          sx={{
            width: "30%",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          sx={{
            width: "60%",
          }}
        />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outlined">Add More</Button>
        <Button variant="contained">Save</Button>
      </div>
    </div>
  );
};

export default PayloadSection;
