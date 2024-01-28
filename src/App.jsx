import { Route, Routes } from "react-router-dom";
import "./App.css";
import RoomsPage from "./pages/Roomspage";

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
