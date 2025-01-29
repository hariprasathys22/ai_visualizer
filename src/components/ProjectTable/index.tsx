import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
interface ProjectDetails {
  name: string;
}
const ProjectTable = () => {
  const [projects, setProjects]: any = useState([]);

  const tableHeader = [
    "Name",
    "Status",
    "No of Data",
    "Size of embedding",
    "Actions"
  ];

  const fetchProject = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/collection/listCollections",
        {
          method: "GET"
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProjects(data.result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProject();
    console.log(projects, "data");
  }, []);
  return (
    <div className="w-full">
      <TableContainer
        sx={{ border: "0.5px solid #e4e4e4", borderRadius: "5px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#ef6a36" }}>
              {tableHeader.map((head, index) => (
                <TableCell
                  key={`key-${index + 1}`}
                  sx={{
                    border: "none",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 500
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {projects ? (
              projects.map((project: ProjectDetails, index: number) => (
                <TableRow key={`project-${index + 1}`}>
                  <TableCell>{project.name}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>No Data Found</TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectTable;
