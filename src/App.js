import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import NavBar from "./components/nav-bar/nav-bar";
import Analysis from "./pages/analysis/analysis";
import ApiConnectiong from "./pages/base/api";
import Base from "./pages/base/base";
import ConnectiongInvest from "./pages/base/base-investing";
import Differences from "./pages/base/differences";
import Limits from "./pages/base/limits";
import P2p from "./pages/base/p2p";
import Register from "./pages/base/register-acc";
import Risks from "./pages/base/risks";
import TopupTypes from "./pages/base/topup-types";
import Investments from "./pages/investments/investments";
import Auth from "./pages/login-auth/auth";
import Login from "./pages/login-auth/login";
import Reset from "./pages/login-auth/reset";
import Rates from "./pages/rates/rates";
import Review from "./pages/review/review";
import Settings from "./pages/settings/settings";

function App() {
  const location = useLocation();
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const updatebalance = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://trade.margelet.org/private-api/v1/users/balance/update", {
      method: "POST",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
      
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      updatebalance();
    }
  }, [localStorage.getItem("token")]);
  return (
    <div className={mode === "dark" ? "black_mode" : "white_mode"}>
      {location.pathname !== "/login" &&
      location.pathname !== "/reset" &&
      location.pathname !== "/auth" ? (
        <NavBar setMode={setMode} />
      ) : (
        ""
      )}

      <div className="page_content ">
        <Routes>
          <Route path="/" element={<Review />} />
          <Route path="/review" element={<Review />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route
            path="/investments"
            element={<Investments updatebalance={updatebalance} />}
          />
          <Route path="/settings/*" element={<Settings />} />
          <Route
            path="/rates/*"
            element={<Rates updatebalance={updatebalance} />}
          />
          <Route path="/base/*" element={<Base />} />
          <Route path="/register-acc" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/api" element={<ApiConnectiong />} />
          <Route path="/base-investing" element={<ConnectiongInvest />} />
          <Route path="/differences" element={<Differences />} />
          <Route path="/risks" element={<Risks />} />
          <Route path="/limits" element={<Limits />} />
          <Route path="/topup-types" element={<TopupTypes />} />
          <Route path="/p2p" element={<P2p />} />
        </Routes>

        {location.pathname !== "/login" &&
        location.pathname !== "/reset" &&
        location.pathname !== "/auth" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
