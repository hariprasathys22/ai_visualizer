import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
interface ProjectDetails {
  name: string;
}

interface ProjectContent {
  name: string;
  status: string;
  points: number;
  size: number;
}
const ProjectTable = () => {
  const [projects, setProjects]: any = useState([]);
  const [AllProjects, setAllProjects]: any = useState([]);
  const tableHeader = [
    "Name",
    "Status",
    "No of Data",
    "Size of embedding",
    "Actions",
  ];

  const fetchProject = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/collection/listCollections",
        {
          method: "GET",
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

  const fetchAProject = async () => {
    let allProject: ProjectContent[] = [];
    try {
      if (projects.length > 0) {
        for (let i = 0; i < projects.length - 1; i++) {
          const response = await fetch(
            `http://localhost:5000/api/collection/listACollection/${projects[i].name}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();
          allProject[i] = {
            name: projects[i].name,
            status: data.result.status,
            points: data.result.points_count,
            size: data.result.config.params.vectors.size
          };
        }
      }
      setAllProjects(allProject);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchAProject();
  }, [fetchProject]);
  return (
    <div className="w-full">
      <TableContainer
        sx={{  borderRadius: "5px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;"  }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ background: "#ef6a36" }}>
              {tableHeader.map((head, index) => (
                <TableCell
                align="center"
                  key={`key-${index + 1}`}
                  sx={{
                    borderRight: "1px solid #e4e4e4",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: 500,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {AllProjects ? (
              AllProjects.map((project: ProjectContent, index: number) => (
                <TableRow key={`project-${index + 1}`} sx={{backgroundColor: "#f8f8f8"}}>
                  <TableCell align="center" sx={{borderRight: "1px solid #e4e4e4",}}>{project.name}</TableCell>
                  <TableCell align="center"
                    sx={{ display: "flex", alignItems: "center", justifyContent: "center",  gap: "10px", borderRight: "1px solid #e4e4e4" }}
                  >
                    <GoDotFill style={{ color: `${project.status}` }} />{" "}
                    {project.status}
                  </TableCell>
                  <TableCell align="center" sx={{borderRight: "1px solid #e4e4e4",}}>{project.points}</TableCell>
                  <TableCell align="center" sx={{borderRight: "1px solid #e4e4e4",}}>{project.size}</TableCell>
                  <TableCell align="center">Delete</TableCell>
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
