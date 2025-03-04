import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useQueryStore } from "../../store";
import { Pages } from "../../routers";

const RightSection = () => {
  const { heading, projectName } = useQueryStore();
  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-md overflow-y-hidden">
      <div className="w-full md:h-[55px] shadow-md rounded-t-3xl flex items-center">
        <p className="font-semibold text-lg ml-6">{ !projectName ? heading : projectName}</p>
      </div>
      <div className="w-full h-full">
        <Routes>
          {Pages.map(({ component, path }) => (
            <Route path={path} element={component} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default RightSection;
