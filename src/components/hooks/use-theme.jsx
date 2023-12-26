import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("mode"));

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("mode"));
    };

    window.addEventListener("themeChanged", handleThemeChange);

    return () => {
      window.removeEventListener("themeChanged", handleThemeChange);
    };
  }, []);

  return theme;
}

export default useTheme;
