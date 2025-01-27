import Dashboard from "../pages/Dashboard";
import { routePath } from "../types/routePath";



export const Pages: routePath[]= [
    {path: "/dashboard", exact: true, component: <Dashboard /> }
]