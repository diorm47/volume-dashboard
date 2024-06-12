import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
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
import NotFound from "./pages/not-found/not-found";
import Rates from "./pages/rates/rates";
import Review from "./pages/review/review";
import Settings from "./pages/settings/settings";
import { BybitOneTap } from "./components/utils/bybit";
import Referals from "./pages/referal/referal";
import CreateAlgorithm from "./pages/create-algorithm/create-algorithm";
import AlgorithmType from "./pages/algorithm-type/algorithm-type";
import AlgorithmTypeAi from "./pages/algorithm-type/algorithm-type-ai";

function App() {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const [mode, setMode] = useState(localStorage.getItem("mode"));
  const [rec, setRec] = useState(false);

  const updatebalance = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://api.nvolume.com/private-api/v1/users/balance/update", {
      method: "POST",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const refreshApiNotification = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://api.nvolume.com/private-api/v1/users/api-keys", {
      method: "GET",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.data.api_keys[0] && localStorage.getItem("token")) {
          setRec(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      updatebalance();
      refreshApiNotification();
    }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (!localStorage.getItem("locale")) {
      let headersList = {
        Accept: "*/*",
      };

      fetch("https://ipwho.is/", {
        method: "GET",

        headers: headersList,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.country_code == "RU") {
            localStorage.setItem("locale", "ru");
          } else {
            localStorage.setItem("locale", "en");
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.setItem("locale", "ru");
        });
    }
  }, [localStorage.getItem("locale")]);

  // localStorage.setItem('token', '601|xQLEtyQ8HvtbPjtQ0PzB0pYqQ499nY1G7lJWw343')

  return (
    <div className={mode === "dark" ? "black_mode" : "white_mode"}>
      {location.pathname !== "/login" &&
      location.pathname !== "/reset" &&
      location.pathname !== "/auth" ? (
        <NavBar setMode={setMode} />
      ) : (
        ""
      )}
      <BybitOneTap />

      <div className="page_content ">
        <Routes>
          <Route path="/" element={<Review rec={rec} />} />
          <Route path="/review" element={<Review rec={rec} />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route
            path="/investments"
            element={
              <Investments updatebalance={updatebalance} setRec={setRec} />
            }
          />
          <Route path="/settings/*" element={<Settings updatebalance={updatebalance}  />} />
          <Route
            path="/pricing/*"
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
          <Route path="/create-algorithm" element={<CreateAlgorithm updatebalance={updatebalance}  />} />
          <Route path="/limits" element={<Limits />} />
          <Route path="/topup-types" element={<TopupTypes />} />
          <Route path="/p2p" element={<P2p />} />
          <Route path="/referal/*" element={<Referals />} />
          <Route path="/algorithm-type" element={<AlgorithmType />} />
          <Route path="/delta" element={<AlgorithmTypeAi />} />
          
          <Route path="*" element={<NotFound />} />
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
