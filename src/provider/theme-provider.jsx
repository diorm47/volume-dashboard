import React from "react";
import { CustomProvider } from "rsuite";
import ru_RU from "rsuite/locales/ru_RU";
import App from "../App";
import useTheme from "../components/hooks/use-theme";

const ThemeWrapper = () => {
  const theme = useTheme();

  return (
    <CustomProvider locale={ru_RU} theme={theme}>
      <App />
    </CustomProvider>
  );
};

export default ThemeWrapper;
