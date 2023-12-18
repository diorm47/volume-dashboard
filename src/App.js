import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/footer";
import NavBar from "./components/nav-bar/nav-bar";
import Analysis from "./pages/analysis/analysis";
import Base from "./pages/base/base";
import Investments from "./pages/investments/investments";
import Rates from "./pages/rates/rates";
import Review from "./pages/review/review";
import Settings from "./pages/settings/settings";
import Register from "./pages/base/register-acc";
import Login from "./pages/login-auth/login";
import Auth from "./pages/login-auth/auth";
import Reset from "./pages/login-auth/reset";

function App() {
  return (
    <div>
      <NavBar />

      <div className="page_content">
        <Routes>
          <Route path="/" element={<Review />} />
          <Route path="/review" element={<Review />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/rates/*" element={<Rates />} />
          <Route path="/base/*" element={<Base />} />
          <Route path="/register-acc" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset" element={<Reset />} />

        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
