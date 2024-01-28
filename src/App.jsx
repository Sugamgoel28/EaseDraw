import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoomsPage from "./pages/Roomspage";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
    </div>
  );
};

export default App;
