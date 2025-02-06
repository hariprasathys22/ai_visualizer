import React, { useEffect, useState } from "react";
import { ServerConfig } from "../../utilities/baseConfig";
import { useQueryStore } from "../../store";
import DropDownComponent from "../../components/DropDown";
import { SelectChangeEvent } from "@mui/material";

const ProjectSection = () => {
  const [datas, setDatas] = useState<string[]>([]);
  const { projectName } = useQueryStore();
  const [changeCategory, setChangeCategory] = useState("");
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

  useEffect(() => {
    fetchVectorByCollection();
    console.log(datas, "query data");
  }, []);

  return (
    <div className="w-full h-full p-4">
      <div className="w-1/4 p-2">
        <DropDownComponent
          handleChange={handleChange}
          content={categorySelect}
          value={changeCategory} // <-- Pass the state you want to bind
          label="Select Category"
        />
      </div>
    </div>
  );
};

export default ProjectSection;
