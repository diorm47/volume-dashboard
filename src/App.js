import { Route, Routes } from "react-router-dom";
import NavBar from "./components/nav-bar/nav-bar";
import Review from "./pages/review/review";
import Analysis from "./pages/analysis/analysis";
import Footer from "./components/footer/footer";
import Investments from "./pages/investments/investments";

function App() {
  return (
    <div className="page_wrapper">
      <NavBar />

      <div className="page_content">
        <Routes>
          <Route path="/" element={<Review />} />
          <Route path="/review" element={<Review />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/investments" element={<Investments />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
