import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { PiPlus } from "react-icons/pi";
import ModalWindow from "../ModalComponent";
import NewProject from "../CreateProject";

const SearchBar = () => {
  const [openProject, setOpenProject] = useState(false);
  const handleOpen = () => {
    setOpenProject(true);
  };
  const handleClose = () => {
    setOpenProject(false);
  };

  return (
    <div className="w-full flex justify-between items-center">
      <TextField
        id="outlined-basic"
        label="Search Projects"
        variant="outlined"
        sx={{
          width: "30%"
        }}
      />
      <Button
        variant="contained"
        startIcon={<PiPlus />}
        sx={{ background: "#ef6a36" }}
        onClick={handleOpen}
      >
        New Project
      </Button>
        <ModalWindow open={openProject} onClose={handleClose}>
          <NewProject setOpenProject = {setOpenProject} />
        </ModalWindow>
      
    </div>
  );
};

export default SearchBar;
