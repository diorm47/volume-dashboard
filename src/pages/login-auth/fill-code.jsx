import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../components/snackbar/snackbar";

function FillCode({ email }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(300); // 5 minutes timer
  const inputsRef = useRef([]);
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

  const handleChange = (element, index) => {
    const value = element.value;
    setOtp([...otp.slice(0, index), value, ...otp.slice(index + 1)]);
    setErrorResponce(false);
    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyUp = (event, index) => {
    if (event.keyCode === 8 && index > 0) {
      // Move to previous input
      inputsRef.current[index - 1].focus();
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
    bodyContent.append("code", otp.join(""));

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
        {otp.map((data, index) => (
          <input
            key={index}
            className="text-center form-control"
            type="number"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            ref={(ref) => (inputsRef.current[index] = ref)}
          />
        ))}
      </div>
      <div className="getcode_timer">
        <p>Отправить повторно ({formatTimer()})</p>
      </div>
      <button
        id="submitBtn"
        className="fill_code_svm"
        onClick={handleSubmitCode}
        disabled={otp.join("").length < 6}
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
