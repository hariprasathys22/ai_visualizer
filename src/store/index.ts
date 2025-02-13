import { create } from 'zustand'
import { ServerConfig } from '../utilities/baseConfig';

interface queryServiceState{
    heading: string;
    projectName: string;
    projects: string[];
}

interface setQueryService extends queryServiceState{
    setHeading: (head: string) => void;
    setProjectName: (projectName: string) => void;
    setProjects: (projects: string[]) => void;
    fetchProject: () => Promise<void>;
}

export const useQueryStore = create<setQueryService>((set) => ({
    heading: "Dashboard",
    projectName: "",
    projects: [],
    setHeading: (newHeading) => set({ heading: newHeading }),
    setProjectName: (projectName) => set({ projectName: projectName }),
    setProjects: (projects) => set({ projects }),
    fetchProject: async () => {
        try {
          const response = await fetch(
            `${ServerConfig.BASE_URL}api/collection/listCollections`,
            {
              method: "GET",
            }
          );
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          set({ projects: data.result.map((proj: { name: string }) => proj.name) });
        } catch (e) {
          console.error(e);
        }
      }
}))