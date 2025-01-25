import { create } from 'zustand'

interface queryServiceState{
    heading: string;
}

interface setQueryService extends queryServiceState{
    setHeading: (head: string) => void;
}

export const useQueryStore = create<setQueryService>((set) => ({
    heading: "Dashboard",
    setHeading: (newHeading) => set({ heading: newHeading }),
}))