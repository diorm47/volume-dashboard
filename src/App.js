import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/footer";
import NavBar from "./components/nav-bar/nav-bar";
import Analysis from "./pages/analysis/analysis";
import Base from "./pages/base/base";
import Register from "./pages/base/register-acc";
import Investments from "./pages/investments/investments";
import Auth from "./pages/login-auth/auth";
import Login from "./pages/login-auth/login";
import Reset from "./pages/login-auth/reset";
import Rates from "./pages/rates/rates";
import Review from "./pages/review/review";
import Settings from "./pages/settings/settings";
import ApiConnectiong from "./pages/base/api";
import ConnectiongInvest from "./pages/base/base-investing";
import Differences from "./pages/base/differences";
import Risks from "./pages/base/risks";
import Limits from "./pages/base/limits";
import TopupTypes from "./pages/base/topup-types";
import P2p from "./pages/base/p2p";
import Policy from "./pages/base/policy";
import Agreement from "./pages/base/agreement";
import Whitepaper from "./pages/base/white-paper";

import axios from "axios";

const url = "https://api-testnet.bybit.com";

const apiKey = "jsQKccNQWrwV2xosJS"; // Better to store this securely
const secret = "Y0U1ZIlsBNE7xbDXw2CRnsHtJzkcmo0593OM"; // Better to store this securely
const recvWindow = 5000;
const timestamp = Date.now().toString();

const getSignature = (parameters) => {
  // Use a suitable hashing library that works in the browser
  // e.g., crypto-js
  const CryptoJS = require("crypto-js");
  const message = timestamp + apiKey + recvWindow + parameters;
  return CryptoJS.HmacSHA256(message, secret).toString();
};

function App() {
  const location = useLocation();
  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const [balance, setBalance] = useState(null);

  const http_request = async (endpoint, method, data, Info) => {
    const sign = getSignature(data);
    let fullendpoint;

    if (method === "POST") {
      fullendpoint = url + endpoint;
    } else {
      fullendpoint = url + endpoint + "?" + data;
      data = "";
    }

    const headers = {
      "X-BAPI-SIGN-TYPE": "2",
      "X-BAPI-SIGN": sign,
      "X-BAPI-API-KEY": apiKey,
      "X-BAPI-TIMESTAMP": timestamp,
      "X-BAPI-RECV-WINDOW": recvWindow.toString(),
    };

    if (method === "POST") {
      headers["Content-Type"] = "application/json; charset=utf-8";
    }

    const config = {
      method: method,
      url: fullendpoint,
      headers: headers,
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(Info + " response: ", response.data);
      return response.data;
    } catch (error) {
      console.error(Info + " error: ", error.response.data);
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      // Replace with the appropriate endpoint and method to fetch the balance
      await http_request(
        "/v5/account/wallet-balance?accountType=UNIFIED&coin=USDT",
        "GET",
        "",
        "Fetching Balance"
      );
      // if (balanceData) {
      //   setBalance(balanceData); // Update the state with the fetched balance
      // }
    };

    fetchBalance();
  }, []);

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
          <Route path="/investments" element={<Investments />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/rates/*" element={<Rates />} />
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
          <Route path="/policy" element={<Policy />} />
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
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
