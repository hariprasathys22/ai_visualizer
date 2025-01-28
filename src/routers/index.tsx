import ChatHelper from "../pages/ChatHelper";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import { routePath } from "../types/routePath";



export const Pages: routePath[]= [
    {path: "/dashboard", exact: true, component: <Dashboard /> },
    {path: "/chat", exact: true, component: <ChatHelper />},
    {path: "/projects", exact: true, component: <Projects />}
]