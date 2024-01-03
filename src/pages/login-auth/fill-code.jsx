import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../components/snackbar/snackbar";
import { useTranslation } from "react-i18next";

function FillCode({ email, reset }) {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const [errorResponce, setErrorResponce] = useState(false);

  // timer
  const [timer, setTimer] = useState(300);
  const startTimer = () => {
    setTimer(300);
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) return prevTime - 1;
        clearInterval(interval);
        return 0;
      });
    }, 1000);
  };
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  useEffect(() => {
    startTimer();
  }, []);
  useEffect(() => {
    if (errorResponce) {
      setTimeout(() => {
        setErrorResponce(false);
      }, 3000);
    }
  }, [errorResponce]);

  const handleChange = (value) => {
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmitCode = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("code", otp);

    fetch("https://api.nvolume.com/private-api/v1/users/two-factor", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        navigate("/review");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorResponce(true);
      });
  };

  const restart = () => {
    startTimer();
    reset()
  };

  const { t } = useTranslation();
  return (
    <div className="auth_section fill_code">
      <div className="login_title">
        <h2>{t("enterCode")}</h2>
        <p>
          {t("codeSentTo")} <span className="sending_email">{email}</span>
        </p>
      </div>
      <div
        id="otp"
        className={
          errorResponce
            ? "error_filled_status fillcode_inputs"
            : " fillcode_inputs"
        }
      >
        <input
          className="text-center form-control"
          type="number"
          maxLength="6"
          value={otp}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div className="getcode_timer">
        {formatTimer() == "00:00" ? (
          <p onClick={restart} style={{ cursor: "pointer" }}>
            {t("resendCodeIn")}
          </p>
        ) : (
          <p>
            {t("resendCodeIn")} ({formatTimer()})
          </p>
        )}
      </div>
      <button
        id="submitBtn"
        className="fill_code_svm"
        onClick={handleSubmitCode}
        disabled={otp.length < 6}
      >
        {t("check")}
      </button>

      <Snackbar text={t("error_code")} status="error" visible={errorResponce} />
    </div>
  );
}

export default FillCode;
