import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export interface Dropdown {
  content: string[];
  value: string | number;
  handleChange: (event: any) => void;
  label: string;
}
const DropDownComponent: React.FC<Dropdown> = ({
  content,
  value,
  handleChange,
  label
}) => {
  return (
    <div className="w-full">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {content?.map((contents, index) => (
            <MenuItem key={index + 1} value={contents}>
              {contents}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropDownComponent;
