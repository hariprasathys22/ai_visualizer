import { Button, TextField } from "@mui/material"
import { PiPlus } from "react-icons/pi"


const SearchBar = () => {
  return (
    <div className='w-full flex justify-between items-center'>
         <TextField id="outlined-basic" label="Search Projects" variant="outlined" sx={{
            width: "30%"
         }} />
         <Button variant="contained" startIcon={<PiPlus />} sx={{background: "#ef6a36"}}>New Project</Button>
    </div>
  )
}

export default SearchBar