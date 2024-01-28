import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoomsPage from "./pages/Roomspage";
import { SpeedInsights } from "@vercel/speed-insights/react"

// Main App component
const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<RoomsPage/>}
        />
      </Routes>
      <SpeedInsights/>
    </div>
  );
};

export default App;
