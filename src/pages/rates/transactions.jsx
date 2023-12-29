import empty_block from "../../assets/icons/empty-block.png";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

function Transactions() {
  React.useEffect(() => {
    document.title = `Транзакции | &Volume`;
  }, []);
  const [transactions, setTransactions] = useState([]);

  const getTransactions = () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    fetch("https://trade.margelet.org/private-api/v1/users/transactions", {
      method: "GET",
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data.data.transactions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTransactions();
    }
  }, [localStorage.getItem("token")]);

  const formatTime = (time) => {
    const parsedDate = new Date(time);

    const formattedDate = format(parsedDate, "dd.MM.yyyy, HH:mm:ss");
    return formattedDate;
  };
  console.log(transactions);
  return (
    <div className="orders_history_list main_block_wrapper">
      <div className="main_block_wrapper_top">
        <div className="main_block_wrapper_title secondary_title">
          <h2>Транзакции</h2>
          <p>Здесь отображается список транзакций</p>
        </div>
      </div>
      {transactions && transactions.length ? (
        <div className="main_block_wrapper_bottom ">
          {transactions.map((item, index) => (
            <div
              className="order_history_list_item transaction_item"
              key={index}
            >
              <div className="order_history_list_item_title">
                <h2>ID {item.invoice_id}</h2>
                {item.status == "created" ? (
                  <div className="order_item_top_status order_item_top_status_process">
                    <p>В обработке</p>
                  </div>
                ) : (
                  ""
                )}
                {item.status == "error" ? (
                  <div className="order_item_top_status">
                    <p>Ошибка</p>
                  </div>
                ) : (
                  ""
                )}
                {item.status == "success" ? (
                  <div className="order_item_top_status order_item_top_status_success">
                    <p>Выполнена</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="order_history_list_item_content analysis_order_items">
                <div className="order_history_list_item_content_item">
                  <p>
                    Время создания <span>{formatTime(item.created_at)}</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Тип транзакции <span>{item.method}</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Комиссия <span>$ -</span>
                  </p>
                </div>
                <div className="order_history_list_item_content_item">
                  <p>
                    Сумма транзакции<span>{item.amount} USDT</span>
                  </p>
                </div>
              </div>
              <div className="order_history_list_line"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="main_block_wrapper_bottom">
          <div className="empty_block">
            <img src={empty_block} alt="" />
            <p>Нет транзакций</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
