import { Route, Routes } from "react-router-dom";
import NavBar from "./components/nav-bar/nav-bar";
import Review from "./pages/review/review";

function App() {
  return (
    <div className="page_wrapper">
      <NavBar />

      <div className="page_content">
        <Routes>
          <Route path="/" element={<Review />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
