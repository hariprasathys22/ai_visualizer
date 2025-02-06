import { create } from 'zustand'

interface queryServiceState{
    heading: string;
    projectName: string;
}

interface setQueryService extends queryServiceState{
    setHeading: (head: string) => void;
    setProjectName: (projectName: string) => void;
}

export const useQueryStore = create<setQueryService>((set) => ({
    heading: "Dashboard",
    projectName: "",
    setHeading: (newHeading) => set({ heading: newHeading }),
    setProjectName: (projectName) => set({ projectName: projectName })
}))