import React from "react";

function Transactions() {
  React.useEffect(() => {
    document.title = `Транзакции | &Volume`;
  }, []);
  return (
    <div class="orders_history_list main_block_wrapper">
      <div class="main_block_wrapper_top">
        <div class="main_block_wrapper_title secondary_title">
          <h2>Транзакции</h2>
          <p>Здесь отображается список транзакций</p>
        </div>
      </div>
      <div class="main_block_wrapper_bottom ">
        <div class="order_history_list_item ">
          <div class="order_history_list_item_title">
            <h2>ID 341431</h2>
            <div class="order_item_top_status">
              <p>Ошибка</p>
            </div>
          </div>
          <div class="order_history_list_item_content analysis_order_items">
            <div class="order_history_list_item_content_item">
              <p>
                Время создания <span>27.11.2023, 12:43:41</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Тип транзакции <span>Оплата тарифа</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Комиссия <span>$ 3,54</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Сумма транзакции<span>103,54 USDT</span>
              </p>
            </div>
          </div>
        </div>
        <div class="order_history_list_line"></div>
        <div class="order_history_list_item ">
          <div class="order_history_list_item_title">
            <h2>ID 341431</h2>
            <div class="order_item_top_status order_item_top_status_success">
              <p>Выполнена</p>
            </div>
          </div>
          <div class="order_history_list_item_content analysis_order_items">
            <div class="order_history_list_item_content_item">
              <p>
                Время создания <span>27.11.2023, 12:43:41</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Тип транзакции <span>Оплата тарифа</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Комиссия <span>$ 3,54</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Сумма транзакции<span>103,54 USDT</span>
              </p>
            </div>
          </div>
        </div>
        <div class="order_history_list_line"></div>
        <div class="order_history_list_item ">
          <div class="order_history_list_item_title">
            <h2>ID 341431</h2>
            <div class="order_item_top_status order_item_top_status_process">
              <p>В обработке</p>
            </div>
          </div>
          <div class="order_history_list_item_content analysis_order_items">
            <div class="order_history_list_item_content_item">
              <p>
                Время создания <span>27.11.2023, 12:43:41</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Тип транзакции <span>Оплата тарифа</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Комиссия <span>$ 3,54</span>
              </p>
            </div>
            <div class="order_history_list_item_content_item">
              <p>
                Сумма транзакции<span>103,54 USDT</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
