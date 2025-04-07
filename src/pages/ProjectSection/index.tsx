import React, { useEffect, useState } from "react";
import { ServerConfig } from "../../utilities/baseConfig";
import { useQueryStore } from "../../store";
import DropDownComponent from "../../components/DropDown";
import VectorContent from "../../components/VectorContent";
import { Button, CircularProgress, Input } from "@mui/material";
import ModalWindow from "../../components/ModalComponent";
import PayloadSection from "../../sections/PayloadSection";

const ProjectSection = () => {
  const [datas, setDatas] = useState<string[]>([]);
  const [openAddDetails, setOpenAddDetails] = useState<boolean>(false);
  const { projectName } = useQueryStore();
  const [changeCategory, setChangeCategory] = useState("All");
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

  const handleExcelChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setExcelFile(file);
      setError(null);
      setSuccessMessage(null);

      const formData = new FormData();
      formData.append("excelFile", file);

      setLoading(true);
      try {
        const response = await fetch(
          `${ServerConfig.BASE_URL}api/uploadExcel/${projectName}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        setSuccessMessage(result.message);
      } catch (err: any) {
        setError(err.message || "An error occurred while uploading the file");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePdfChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPdfFile(file);
      setError(null);
      setSuccessMessage(null);

      const formData = new FormData();
      formData.append("pdfFile", file);

      setLoading(true);
      try {
        const response = await fetch(
          `${ServerConfig.BASE_URL}api/uploadPdf/${projectName}`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();
        setSuccessMessage(result.message);
      } catch (err: any) {
        setError(err.message || "An error occurred while uploading the file");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchVectorByCollection();
    console.log(datas, "query data");
  }, []);

  return (
    <div className="w-full h-full p-4 relative overflow-y-auto">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <div className="w-1/4">
          <DropDownComponent
            handleChange={handleChange}
            content={categorySelect}
            value={changeCategory}
            label="Select Category"
          />
        </div>
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        <div className="flex gap-4">
          <Button variant="contained" onClick={handleOpen}>
            Add Data
          </Button>
          <div>
            <Input
              type="file"
              onChange={handleExcelChange}
              sx={{ display: "none" }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button variant="contained" component="span">
                Upload Excel
              </Button>
            </label>
          </div>
          <div>
            <Input
              type="file"
              onChange={handlePdfChange}
              sx={{ display: "none" }}
              id="file-pdf"
            />
            <label htmlFor="file-pdf">
              <Button variant="contained" component="span">
                Upload Pdf
              </Button>
            </label>
          </div>
        </div>
      </div>
      <div className="w-full h-auto">
        <VectorContent datas={datas} changeCategory={changeCategory} />
      </div>
      <ModalWindow open={openAddDetails} onClose={handleClose}>
        <PayloadSection setOpenAddDetails={setOpenAddDetails} />
      </ModalWindow>
    </div>
  );
};

export default ProjectSection;
