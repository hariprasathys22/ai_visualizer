import { ReactNode } from "react";

export interface routePath  {
    path: string;
    exact: boolean;
    component: ReactNode;
}