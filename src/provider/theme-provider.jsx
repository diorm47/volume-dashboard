import React from "react";
import { useTranslation } from "react-i18next";
import { CustomProvider } from "rsuite";
import enUS from "rsuite/locales/en_US";
import ru_RU from "rsuite/locales/ru_RU";
import App from "../App";
import useTheme from "../components/hooks/use-theme";

const ThemeWrapper = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <CustomProvider locale={i18n.language == "en" ? enUS : ru_RU} theme={theme}>
      <App />
    </CustomProvider>
  );
};

export default ThemeWrapper;
