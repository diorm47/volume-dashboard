import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Down } from "../assets/icons/bottom-arrow.svg";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="nav_menu_item">
      <p style={{ textTransform: 'uppercase' }}>{i18n.language}</p>
      <Down className="drop_down_icon" />
      <div className="nav_menu_item_drop">
        {/* <NavLink to="/ru"> */}
        <p onClick={() => changeLanguage("ru")}>RU</p>
        {/* </NavLink> */}
        {/* <NavLink to="/en"> */}
        <p onClick={() => changeLanguage("en")}>EN</p>
        {/* </NavLink> */}
        {/* <NavLink to="/se"> */}
        <p>SE</p>
        {/* </NavLink> */}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
