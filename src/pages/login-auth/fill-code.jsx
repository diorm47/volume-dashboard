import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../components/snackbar/snackbar";

function FillCode({ email }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);

  const navigate = useNavigate();
  const [errorResponce, setErrorResponce] = useState(false);
  useEffect(() => {
    if (errorResponce) {
      setTimeout(() => {
        setErrorResponce(false);
      }, 3000);
    }
  }, [errorResponce]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (value) => {
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
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

  return (
    <div className="auth_section fill_code">
      <div className="login_title">
        <h2>Введите код</h2>
        <p>
          Мы отправили код на <span className="sending_email">{email}</span>
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
        <p>Отправить повторно ({formatTimer()})</p>
      </div>
      <button
        id="submitBtn"
        className="fill_code_svm"
        onClick={handleSubmitCode}
        disabled={otp.length < 6}
      >
        Проверить
      </button>

      <Snackbar
        text="Ошибка проверочного кода. Проверьте правильность введенных данных."
        status="error"
        visible={errorResponce}
      />
    </div>
  );
}

export default FillCode;
