import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Down } from "../../assets/icons/bottom-arrow.svg";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit-nav-mob.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/nav-chat-icon.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/nav-menu-burger.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./nav-bar.css";
// import { ReactComponent as NotificationICon } from "../../assets/icons/nav-notification-icon.svg";
import { useTranslation } from "react-i18next";
import { ReactComponent as BlackMode } from "../../assets/icons/black_theme.svg";
import { ReactComponent as LightMode } from "../../assets/icons/ligt-mode.svg";

import avatar from "../../assets/images/avatar.png";
import LanguageSwitcher from "../lang-switcher";
import { mainApi } from "../utils/main-api";
import { changeTheme } from "../utils/utils";

function NavBar({ setMode }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userData, setUserData] = useState({});

  const toggleMode = () => {
    const newMode = localStorage.getItem("mode") === "dark" ? "light" : "dark";
    localStorage.setItem("mode", newMode);
    setMode(newMode);

    changeTheme(newMode);
  };
  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("mode", "light");

    setMode("light");
    changeTheme("light");
    mainApi
      .logout()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      mainApi
        .reEnter()
        .then((res) => {
          setUserData(res.data.user);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [localStorage.getItem("token")]);

  const { t } = useTranslation();

  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setMenuVisible(false);
  };

  return (
    <nav>
      <div className="nav_wrapper">
        <div className="nav_wrapper_left">
          <NavLink to="/">
            <div className="nav_logo">
              <Logo />
            </div>
          </NavLink>
          <div className="nav_bar_menu">
            <NavLink to="/review">
              <div className="nav_menu_item">
                <p> {t("nav_menu_1")} </p>
              </div>
            </NavLink>
            <NavLink to="/analysis">
              <div className="nav_menu_item">
                <p> {t("nav_menu_2")} </p>
              </div>
            </NavLink>
            <NavLink to="/investments">
              <div className="nav_menu_item">
                <p> {t("nav_menu_3")} </p>
              </div>
            </NavLink>

            <div className="nav_menu_item ">
              <p> {t("nav_menu_4")} </p>

              <Down className="drop_down_icon" />
              <div className="nav_menu_item_drop">
                <NavLink to="/rates/rates">
                  <p> {t("nav_menu_4")} </p>
                </NavLink>
                <NavLink to="/rates/transactions">
                  <p> {t("nav_menu_5")} </p>
                </NavLink>
              </div>
            </div>

            <div className="nav_menu_item">
              <p> {t("nav_menu_6")} </p>

              <Down className="drop_down_icon" />
              <div className="nav_menu_item_drop nav_menu_item_drop_settings">
                <NavLink to="/settings/profile">
                  <p>{t("nav_menu_7")}</p>
                </NavLink>
                <NavLink to="/settings/security">
                  <p> {t("nav_menu_8")} </p>
                </NavLink>
                <NavLink to="/settings/api-keys">
                  <p> {t("nav_menu_9")} </p>
                </NavLink>
              </div>
            </div>

            <div className="nav_menu_item">
              <p> {t("nav_menu_10")} </p>

              <Down className="drop_down_icon" />
              <div className="nav_menu_item_drop nav_menu_item_drop_learn">
                <NavLink to="/base">
                  <p> {t("nav_menu_11")} </p>
                </NavLink>
                <NavLink
                  target="_blank"
                  to="https://nvolume.com/white-paper.html"
                >
                  <p>Whitepaper</p>
                </NavLink>
                <NavLink target="_blank" to="https://nvolume.com/policy.html">
                  <p> {t("nav_menu_12")} </p>
                </NavLink>
                <NavLink
                  target="_blank"
                  to="https://nvolume.com/agreement.html"
                >
                  <p> {t("nav_menu_13")} </p>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="nav_wrapper_right">
          {/* <div className="nav_menu_item">
            <p>RU</p>
            <Down className="drop_down_icon" />
            <div className="nav_menu_item_drop">
              <NavLink to="/ru">
                <p>RU</p>
              </NavLink>
              <NavLink to="/en">
                <p>EN</p>
              </NavLink>
              <NavLink to="/se">
                <p>SE</p>
              </NavLink>
            </div>
          </div> */}
          <LanguageSwitcher />
          <div className="mode_toggler">
            {localStorage.getItem("mode") === "dark" ? (
              <BlackMode onClick={toggleMode} className="black_mode_handler" />
            ) : (
              <LightMode onClick={toggleMode} />
            )}
          </div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="18"
            viewBox="0 0 2 18"
            className="nav_menu_vert_line"
            fill="#dbdbdb"
          >
            <path d="M1 0V18" stroke="#dbdbdb" />
          </svg> */}

          <div className="nav_menu_item">
            <ChatIcon />
            <div className="nav_menu_item_drop nav_menu_item_drop_chat">
              <NavLink to="https://t.me/">
                <p>Telegram</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4026 16.4917V16.49L15.4176 16.4542L17.9167 3.85415V3.81415C17.9167 3.49999 17.8001 3.22582 17.5484 3.06165C17.3276 2.91749 17.0734 2.90749 16.8951 2.92082C16.7291 2.93583 16.5653 2.96938 16.4067 3.02082C16.3391 3.04262 16.2724 3.06708 16.2067 3.09415L16.1959 3.09832L2.26256 8.56415L2.25839 8.56582C2.21603 8.58029 2.17457 8.59726 2.13422 8.61665C2.03513 8.66117 1.94006 8.71415 1.85006 8.77499C1.67089 8.89832 1.33006 9.18832 1.38756 9.64832C1.43506 10.03 1.69756 10.2717 1.87506 10.3975C1.97983 10.4709 2.09247 10.5324 2.21089 10.5808L2.23756 10.5925L2.24589 10.595L2.25172 10.5975L4.69006 11.4183C4.68172 11.5708 4.69672 11.7267 4.73756 11.8808L5.95839 16.5133C6.02508 16.7658 6.1692 16.9911 6.37049 17.1575C6.57179 17.3239 6.82015 17.4231 7.0807 17.4411C7.34126 17.4592 7.60091 17.3951 7.8232 17.258C8.04548 17.1209 8.21924 16.9176 8.32006 16.6767L10.2267 14.6383L13.5009 17.1483L13.5476 17.1683C13.8451 17.2983 14.1226 17.3392 14.3767 17.305C14.6309 17.27 14.8326 17.1633 14.9842 17.0425C15.1596 16.9003 15.2995 16.7191 15.3926 16.5133L15.3992 16.4992L15.4017 16.4942L15.4026 16.4917ZM5.94589 11.5625C5.93237 11.5111 5.93558 11.4567 5.95507 11.4073C5.97455 11.3578 6.00928 11.3159 6.05422 11.2875L14.3217 6.03749C14.3217 6.03749 14.8084 5.74165 14.7909 6.03749C14.7909 6.03749 14.8776 6.08915 14.6167 6.33165C14.3701 6.56249 8.72422 12.0133 8.15256 12.565C8.12077 12.5959 8.0985 12.6352 8.08839 12.6783L7.16672 16.195L5.94589 11.5617"
                    fill="black"
                  />
                </svg>
              </NavLink>
              {/* <NavLink to="https://">
                <p>Discord</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M16.0583 4.44162C14.9499 3.92496 13.7499 3.54996 12.4999 3.33329C12.489 3.33294 12.4781 3.335 12.468 3.33932C12.4579 3.34364 12.4489 3.35011 12.4416 3.35829C12.2916 3.63329 12.1166 3.99162 11.9999 4.26662C10.6741 4.06662 9.32577 4.06662 7.99994 4.26662C7.88327 3.98329 7.70827 3.63329 7.54994 3.35829C7.5416 3.34162 7.5166 3.33329 7.4916 3.33329C6.2416 3.54996 5.04993 3.92496 3.93327 4.44162C3.92493 4.44162 3.9166 4.44996 3.90827 4.45829C1.6416 7.84996 1.0166 11.15 1.32493 14.4166C1.32493 14.4333 1.33327 14.45 1.34993 14.4583C2.84993 15.5583 4.2916 16.225 5.7166 16.6666C5.7416 16.675 5.7666 16.6666 5.77493 16.65C6.10827 16.1916 6.40827 15.7083 6.6666 15.2C6.68327 15.1666 6.6666 15.1333 6.63327 15.125C6.15827 14.9416 5.70827 14.725 5.2666 14.475C5.23327 14.4583 5.23327 14.4083 5.25827 14.3833C5.34994 14.3166 5.4416 14.2416 5.53327 14.175C5.54993 14.1583 5.57493 14.1583 5.5916 14.1666C8.45827 15.475 11.5499 15.475 14.3833 14.1666C14.3999 14.1583 14.4249 14.1583 14.4416 14.175C14.5333 14.25 14.6249 14.3166 14.7166 14.3916C14.7499 14.4166 14.7499 14.4666 14.7083 14.4833C14.2749 14.7416 13.8166 14.95 13.3416 15.1333C13.3083 15.1416 13.2999 15.1833 13.3083 15.2083C13.5749 15.7166 13.8749 16.2 14.1999 16.6583C14.2249 16.6666 14.2499 16.675 14.2749 16.6666C15.7083 16.225 17.1499 15.5583 18.6499 14.4583C18.6666 14.45 18.6749 14.4333 18.6749 14.4166C19.0416 10.6416 18.0666 7.36662 16.0916 4.45829C16.0833 4.44996 16.0749 4.44162 16.0583 4.44162ZM7.09994 12.425C6.2416 12.425 5.52493 11.6333 5.52493 10.6583C5.52493 9.68329 6.22494 8.89162 7.09994 8.89162C7.98327 8.89162 8.68327 9.69162 8.67493 10.6583C8.67493 11.6333 7.97494 12.425 7.09994 12.425ZM12.9083 12.425C12.0499 12.425 11.3333 11.6333 11.3333 10.6583C11.3333 9.68329 12.0333 8.89162 12.9083 8.89162C13.7916 8.89162 14.4916 9.69162 14.4833 10.6583C14.4833 11.6333 13.7916 12.425 12.9083 12.425Z"
                    fill="black"
                  />
                </svg>
              </NavLink> */}
            </div>
          </div>

          {/* <div className="nav_menu_item">
            <NotificationICon />
            <div className="nav_menu_item_drop nav_menu_item_drop_notifications">
              <NavLink to="/a">
                <p>Уведомление о изменение платежной системы на &volume</p>
                <span>20.11.2023, 16:00:31</span>
              </NavLink>
              <NavLink to="/a">
                <p>Уведомление о изменение платежной системы на &volume</p>
                <span>20.11.2023, 16:00:31</span>
              </NavLink>{" "}
              <NavLink to="/a">
                <p>Уведомление о изменение платежной системы на &volume</p>
                <span>20.11.2023, 16:00:31</span>
              </NavLink>{" "}
              <NavLink to="/a">
                <p>Уведомление о изменение платежной системы на &volume</p>
                <span>20.11.2023, 16:00:31</span>
              </NavLink>
            </div>
          </div> */}
          <div className="nav_menu_item">
            <img
              className="user_nav_avatar"
              src={userData.avatar || avatar}
              alt=""
            />
            <div className="nav_menu_item_drop nav_menu_item_drop_profile">
              <div className="nav_menu_item_drop_profile_block">
                <p>{userData.email}</p>
                {/* <p>USER ID:436425</p> */}
                <p>Пробный</p>
              </div>
              <NavLink to="/settings/profile">
                <p> {t("nav_menu_7")} </p>
              </NavLink>
              {/* <NavLink to="/referals">
                <p> {t("nav_menu_14")} </p>
              </NavLink> */}
              <NavLink to="/login" onClick={handleLogout}>
                <p> {t("nav_menu_15")} </p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="nav_mob_burger" onClick={() => setMenuVisible(true)}>
          <MenuIcon />
        </div>
        <div
          className={
            menuVisible
              ? "nav_mob_menu_wrapper visible_mob_menu"
              : "nav_mob_menu_wrapper"
          }
        >
          <div className="nav_mob_menu_top">
            <NavLink to="/">
              <div className="nav_logo">
                <Logo />
              </div>
            </NavLink>
            <ExitIcon onClick={() => setMenuVisible(false)} />
          </div>
          <div className="nav_mob_menu_wrapper_content_wrapper">
            <div className="nav_mob_menu_wrapper_content">
              <div
                className="nav_bar_menu"
                onClick={() => setMenuVisible(false)}
              >
                <NavLink to="/review">
                  <div className="nav_menu_item">
                    <p> {t("nav_menu_1")} </p>
                  </div>
                </NavLink>
                <NavLink to="/analysis">
                  <div className="nav_menu_item">
                    <p> {t("nav_menu_2")} </p>
                  </div>
                </NavLink>
                <NavLink to="/investments">
                  <div className="nav_menu_item">
                    <p> {t("nav_menu_3")} </p>
                  </div>
                </NavLink>

                <NavLink to="/rates/rates">
                  <div className="nav_menu_item ">
                    <div className="nav_menu_itemm">
                      <p> {t("nav_menu_4")} </p>
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/settings/profile">
                  <div className="nav_menu_item">
                    <div className="nav_menu_itemm">
                      <p> {t("nav_menu_6")} </p>
                    </div>
                  </div>
                </NavLink>
                <NavLink to="/base">
                  <div className="nav_menu_item">
                    <div className="nav_menu_itemm">
                      <p> {t("nav_menu_10")} </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="nav_mob_bottom">
            <div className="nav_mob_bottom_actions">
              {i18n.language == "en" ? (
                <div className="nav_mob_bottom_action">
                  <p onClick={() => changeLanguage("ru")}>Ru</p>
                </div>
              ) : (
                <div className="nav_mob_bottom_action">
                  <p onClick={() => changeLanguage("en")}>En</p>
                </div>
              )}

              {/* <div className="nav_mob_bottom_action">
                <p>Sv</p>
              </div> */}
              <div className="nav_mob_bottom_action mob_lang_toggler">
                {localStorage.getItem("mode") === "dark" ? (
                  <BlackMode
                    onClick={toggleMode}
                    className="black_mode_handler"
                  />
                ) : (
                  <LightMode onClick={toggleMode} />
                )}
              </div>
            </div>
            <div className="nav_logout_btn">
              <NavLink to="/login">
                <button onClick={handleLogout}> {t("nav_menu_15")} </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
