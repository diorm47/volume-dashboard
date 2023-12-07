import React from "react";
import userImg from "../../assets/icons/user-img.svg";

function Profile() {
  return (
    <div className="profile_page">
      <div className="secondary_block_wrapper user_image_block">
        <h2>Изображение профиля</h2>
        <p>Вы можете изменить изображение вашего профиля</p>
        <div class="order_history_list_line"></div>
        <div className="user_img">
          <img src={userImg} alt="" />
          <p>
            Поддерживаются форматы JPG, PNG. Максимальный размер файла <br />{" "}
            для загрузки: 10 Мб
          </p>
        </div>
      </div>
      <div className="secondary_block_wrapper user_image_block">
        <h2>Информация об учетной записи</h2>
        <p>Вы можете поменять данные ниже</p>
        <div class="order_history_list_line"></div>
        <div className="user_data_item">
          <span>Полное имя</span>
          <div>
            <p>Овчинников Данил Игоревич</p>
            <p>Изменить имя</p>
          </div>
        </div>
        <div class="order_history_list_line"></div>
        <div className="user_data_item">
          <span>Псевдоним</span>
          <div>
            <p>DanilOvchinnikovill</p>
            <p>Изменить псевдоним</p>
          </div>
        </div>
        <div class="order_history_list_line"></div>

        <div className="user_data_item">
          <span>Адрес электронной почты</span>
          <div>
            <p>nvolume@mail.ru</p>
            <p>Изменить электронную почту</p>
          </div>
        </div>
        <div class="order_history_list_line"></div>

        <div className="user_data_item">
          <span>Номер телефона</span>
          <div>
            <p>+79000000000</p>
            <p>Изменить номер телефона</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
