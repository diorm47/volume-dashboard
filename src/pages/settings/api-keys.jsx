import React from "react";

function ApiKeys() {
  return (
    <>
      <div className="api_keys_title">
        <div className="api_keys_title_top">
          <h2>Ключи API</h2>
          <div className="add_key_btn">
            <button>+ Добавить ключ API</button>
          </div>{" "}
        </div>
        <span>
          Добавьте пожалуйста подключение API для дальнейшего использования
          &Volume.
        </span>
      </div>
      <div class="secondary_block_wrapper user_image_block add_key_history">
        <div class="user_login_history">
          <table>
            <thead>
              <tr>
                <td>Время добавления</td>
                <td>Статус</td>
                <td>Название</td>
                <td>Биржа</td>
                <td>Действие</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>26 окт. 2023 г., 00:29:16</td>
                <td>Активное</td>
                <td>MyAPI</td>
                <td>Binance</td>
                <td>
         
                  <div className="api_actions">
                    <p>Редактировать </p>
                    <p>|</p>
                    <p>Удалить</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ApiKeys;
