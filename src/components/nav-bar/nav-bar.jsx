import React from "react";
import "./nav-bar.css";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { ReactComponent as Down } from "../../assets/icons/bottom-arrow.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/nav-chat-icon.svg";
import { ReactComponent as NotificationICon } from "../../assets/icons/nav-notification-icon.svg";
import avatar from "../../assets/images/avatar.png";

function NavBar() {
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
                <p>Обзор</p>
              </div>
            </NavLink>
            <NavLink to="/analysis">
              <div className="nav_menu_item">
                <p>Анализ</p>
              </div>
            </NavLink>
            <NavLink to="/investments">
              <div className="nav_menu_item">
                <p>Инвестиции</p>
              </div>
            </NavLink>
            <NavLink to="/">
              <div className="nav_menu_item">
                <p>Тарифы</p>
                <Down />
              </div>
            </NavLink>
            <NavLink to="/">
              <div className="nav_menu_item">
                <p>Настройки</p>
                <Down />
              </div>
            </NavLink>
            <NavLink to="/">
              <div className="nav_menu_item">
                <p>Изучить</p>
                <Down />
              </div>
            </NavLink>
          </div>
        </div>
        <div className="nav_wrapper_right">
          <NavLink to="/">
            <div className="nav_menu_item">
              <p>EN</p>
              <Down />
            </div>
          </NavLink>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="18"
            viewBox="0 0 2 18"
            fill="none"
          >
            <path d="M1 0V18" stroke="#1D1D1D" />
          </svg>
          <NavLink to="/">
            <ChatIcon />
          </NavLink>
          <NavLink to="/">
            <NotificationICon />
          </NavLink>
          <NavLink to="/">
            <img src={avatar} alt="" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
