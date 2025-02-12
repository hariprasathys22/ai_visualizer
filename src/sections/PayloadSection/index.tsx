import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const PayloadSection = () => {
  const [payload, setPayload] = useState<any>({});
  const [mainValue, setMainValue] = useState("");

  const handleMainChange = (event: any) => {
    setMainValue(event.target.value);
  };
  const handlePayloadChange = (index: any, field:any, value:any) => {
    setPayload((prev:any) => {
      const newPayload:any = {...prev}
      newPayload[index] = {...newPayload[index], [field]: value}
      return newPayload
    })
  }

  const addNewField = () => {
    setPayload((prev:any) => ({
      ...prev,
      [`key${Object.keys(prev).length + 1}`]: { key: "", value: "" },
    }));
  };

  const handleSubmit = () => {
    const formattedPayload = Object.values(payload).reduce

  }
  
  return (
    <div className="w-full">
      <div className="w-full relative flex justify-between items-center">
        <TextField
          id="outlined-basic"
          label="Key"
          variant="outlined"
          value="text"
          disabled
          sx={{
            width: "30%"
          }}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          onChange={handleMainChange}
          variant="outlined"
          sx={{
            width: "60%"
          }}
        />
      </div>
      {Object.keys(payload).map((key, index) => (
        <div
          key={index}
          className="w-full relative flex justify-between items-center mt-4"
        >
          <TextField
            label="Key"
            variant="outlined"
            sx={{ width: "30%" }}
            value={payload[key]?.key || ""}
            onChange={(e) => handlePayloadChange(key, "key", e.target.value)}
          />
          <TextField
            label="Value"
            variant="outlined"
            sx={{ width: "60%" }}
            value={payload[key]?.value || ""}
            onChange={(e) => handlePayloadChange(key, "value", e.target.value)}
          />
        </div>
      ))}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outlined" onClick={addNewField}>
          Add More
        </Button>
        <Button variant="contained">Save</Button>
      </div>
    </div>
  );
};

export default PayloadSection;
