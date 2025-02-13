import React, { useEffect, useState } from "react";
import { ServerConfig } from "../../utilities/baseConfig";
import { useQueryStore } from "../../store";
import DropDownComponent from "../../components/DropDown";
import VectorContent from "../../components/VectorContent";
import { Button } from "@mui/material";
import ModalWindow from "../../components/ModalComponent";
import PayloadSection from "../../sections/PayloadSection";

const ProjectSection = () => {
  const [datas, setDatas] = useState<string[]>([]);
  const [openAddDetails, setOpenAddDetails] = useState<boolean>(false)
  const { projectName } = useQueryStore();
  const [changeCategory, setChangeCategory] = useState("All");
  const fetchVectorByCollection = async () => {
    try {
      const response = await fetch(
        `${ServerConfig.BASE_URL}api/collection/retrieveAllVectors/${projectName}`,
        { method: "GET" }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDatas(data.result.points);
    } catch (e) {
      console.error(e);
    }
  };
  const categorySelect: string[] =
    datas.length > 0
      ? ["All", ...new Set(datas.map((data: any) => data.payload.category))]
      : [];
      
  const handleChange = (event: any) => {
    setChangeCategory(event.target.value);
  };
  const handleClose = () => {
    setOpenAddDetails(false);
  };
  const handleOpen = () => {
    setOpenAddDetails(true);
  };
  useEffect(() => {
    fetchVectorByCollection();
    console.log(datas, "query data");
  }, []);

  return (
    <div className="w-full h-full p-4 relative">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <div className="w-1/4 ">
          <DropDownComponent
            handleChange={handleChange}
            content={categorySelect}
            value={changeCategory} // <-- Pass the state you want to bind
            label="Select Category"
          />
        </div>
        <Button variant="contained" onClick={handleOpen}>Add Data</Button>
      </div>
      <div className="w-full">
        <VectorContent datas={datas} changeCategory={changeCategory} />
      </div>
      <ModalWindow open={openAddDetails} onClose={handleClose}>
          <PayloadSection setOpenAddDetails={setOpenAddDetails} />
      </ModalWindow>
    </div>
  );
};

export default ProjectSection;
