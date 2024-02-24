import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../snackbar/snackbar";

export function BybitOneTap() {
  const bridge = "https://proxy.cors.sh/";
  //
  const navigate = useNavigate();
  // snackbar
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackStatus, setSnackStatus] = useState("");
  const snackOptions = (text, status) => {
    setVisibleSnack(true);
    setSnackText(text);
    setSnackStatus(status);
    setTimeout(() => {
      setVisibleSnack(false);
    }, 2000);
  };

  const bybitCodes = async (code) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    let bodyContent = `client_id=bb8fc8894f7e&client_secret=XglW9nJY6TUt3y6Wp4trdWMxL&code=${code}`;

    try {
      let response = await fetch(
        `${bridge}https://api2.bybit.com/oauth/v1/public/access_token`,

        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      let data = await response.json();
      if (data.access_token) {
        bybitKeys(data.access_token);
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };
  const userLanguage = localStorage.getItem("locale") || "ru";
  const localization = {
    en: {
      apiAddedSuccess:
        "The API key was successfully connected. Connection may take up to 5 minutes.",
      apiAddError:
        "Error adding API key. Check the entered data or create a new API key.",
      requestError: "Error!",
    },
    ru: {
      apiAddedSuccess:
        "API ключ успешно подключен. Подключение может занять до 5 минут.",
      apiAddError:
        "Ошибка добавления API ключа. Проверьте правильность введенных данных или создайте новый API ключ.",
      requestError: "Ошибка!",
    },
  };

  const bybitKeys = async (token) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    };

    try {
      let response = await fetch(
        `${bridge}https://api2.bybit.com/oauth/v1/resource/restrict/openapi`,
        {
          method: "GET",
          headers: headersList,
        }
      );

      let data = await response.json();

      if (data.result.api_key) {
        let headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        let bodyContent = new FormData();
        bodyContent.append("title", "&Volume");
        bodyContent.append("exchange", "bybit");
        bodyContent.append("api_key", data.result.api_key);
        bodyContent.append("api_secret", data.result.api_secret);

        fetch("https://api.nvolume.com/private-api/v1/users/api-keys/store", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              snackOptions(
                localization[userLanguage].apiAddedSuccess,
                "success"
              );
              navigate("/investments");
            } else {
              snackOptions(localization[userLanguage].apiAddError, "error");
            }
          })
          .catch((error) => {
            console.log(error);
            snackOptions(localization[userLanguage].requestError, "error");
          });
      }
    } catch (error) {
      console.error("Error fetching Bybit keys:", error);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  useEffect(() => {
    if (code) {
      bybitCodes(code);
    }
  }, [code]);

  return (
    <Snackbar text={snackText} status={snackStatus} visible={visibleSnack} />
  );
}
