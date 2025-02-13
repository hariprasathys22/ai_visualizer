import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { ServerConfig } from "../../utilities/baseConfig";
import { useQueryStore } from "../../store";

interface PayloadItem {
  key: string;
  value: string;
}

// Define the main state type
interface PayloadState {
  [key: string]: PayloadItem;
}
const PayloadSection = ({ setOpenAddDetails }: any) => {
  const [payload, setPayload] = useState<PayloadState>({});
  const [mainValue, setMainValue] = useState<string>("");
  const { projectName } = useQueryStore();
  const handleMainChange = (event: any) => {
    setMainValue(event.target.value);
  };
  const handlePayloadChange = (
    index: string,
    field: "key" | "value",
    value: string
  ) => {
    setPayload((prev: any) => {
      const newPayload: any = { ...prev };
      newPayload[index] = { ...newPayload[index], [field]: value };
      return newPayload;
    });
  };

  const addNewField = () => {
    setPayload((prev: any) => ({
      ...prev,
      [`key${Object.keys(prev).length + 1}`]: { key: "", value: "" },
    }));
  };

  const handleSubmit = async () => {
    const formattedPayload: Record<string, string> = Object.values(
      payload
    ).reduce((acc: Record<string, string>, obj: any) => {
      if (obj.key) {
        acc[obj.key] = obj.value;
      }
      return acc;
    }, {} as Record<string, string>);

    const finalData = {
      text: mainValue,
      payload: formattedPayload,
    };

    try {
      if (finalData) {
        const response = await fetch(
          `${ServerConfig.BASE_URL}api/addEmbedding/${projectName}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Add this header
            },
            body: JSON.stringify(finalData),
          }
        );
        if (response.ok) {
          console.log("Data saved successfully");
          setOpenAddDetails(false);
        } else {
          const errorData = await response.json();
          console.error("Error creating project:", errorData);
        }
      }
    } catch (e) {
      console.error(e);
    }
    console.log(finalData, "final data");
  };

  const handleDeleteInput = (index: number) => {
    const inputText = Object.entries(payload);
    inputText.splice(index, 1);
    const newPayload = Object.fromEntries(inputText);
    setPayload(newPayload);
  };
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
            width: "30%",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          onChange={handleMainChange}
          variant="outlined"
          sx={{
            width: "65%",
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
            sx={{ width: "50%" }}
            value={payload[key]?.value || ""}
            onChange={(e) => handlePayloadChange(key, "value", e.target.value)}
          />
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteInput(index)}
          >
            <MdDelete />
          </IconButton>
        </div>
      ))}
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outlined" onClick={addNewField}>
          Add More
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default PayloadSection;
