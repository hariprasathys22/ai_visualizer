import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import Home from "./pages/Home";
import { theme } from "./utilities/theme";

function App() {
  return (
    <div className="h-screen w-full">
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </div>
  );
}

export default App;
