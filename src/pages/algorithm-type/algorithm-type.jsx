import React from "react";
import "./algorithm-type.css";
import AlgoLineChart from "../../components/algotype-charts/algo-type-line";
import AlgoColumnChart from "../../components/algotype-charts/algo-type-column";

function AlgorithmType() {
  return (
    <div className="pages_wrapper investments_page algorithm_type_page">
      <div className="main_page_title_template">
        <h1>Лонг-Шорт</h1>
      </div>
      <div className="algo_type_top_cards">
        <div class="main_block_wrapper">
          <div class="main_block_wrapper_top">
            <div class="main_block_wrapper_title">
              <h2>Доходность за все время</h2>
            </div>
          </div>
          <div class="main_block_wrapper_bottom">
            <div class="review_left_top_block_content">
              <div class="review_left_top_block_content_amount">
                <p className="algo_type_top_card_green">+ 333.81 %</p>
              </div>
            </div>
          </div>
        </div>
        <div class="main_block_wrapper">
          <div class="main_block_wrapper_top">
            <div class="main_block_wrapper_title">
              <h2>Минимальная сумма</h2>
            </div>
          </div>
          <div class="main_block_wrapper_bottom">
            <div class="review_left_top_block_content">
              <div class="review_left_top_block_content_amount">
                <p>$100</p>
              </div>
            </div>
          </div>
        </div>
        <div class="main_block_wrapper">
          <div class="main_block_wrapper_top">
            <div class="main_block_wrapper_title">
              <h2>Максимальная просадка</h2>
            </div>
          </div>
          <div class="main_block_wrapper_bottom">
            <div class="review_left_top_block_content">
              <div class="review_left_top_block_content_amount">
                <p className="algo_type_top_card_red">- 3.06 % </p>
              </div>
            </div>
          </div>
        </div>
        <div class="main_block_wrapper">
          <div class="main_block_wrapper_top">
            <div class="main_block_wrapper_title">
              <h2>Риск</h2>
            </div>
          </div>
          <div class="main_block_wrapper_bottom">
            <div class="review_left_top_block_content">
              <div class="review_left_top_block_content_amount">
                <p>Средний</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="algorithm_type_block_title">
        <h3>Описание</h3>
      </div>
      <div className="algorithm_type_desc">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className="algorithm_type_block_title">
        <h3>Прошлые результаты</h3>
      </div>
      <div className="secondary_block_wrapper p0">
        <div className="main_block_wrapper_title">
          <h2>График PnL</h2>
        </div>

        <AlgoLineChart />
      </div>
      <div className="secondary_block_wrapper">
        <div className="main_block_wrapper_title">
          <h2>График PnL по месяцам</h2>
        </div>

        <AlgoColumnChart />
      </div>
      <div className="secondary_block_wrapper algo_type_stats">
        <div>
          <p>Дата создания</p>
          <p>01.01.2021</p>
        </div>
        <div>
          <p>Чистый П/У в %</p>
          <p>+333.8%</p>
        </div>
        <div>
          <p>Среднегодовая доходность</p>
          <p>+333.8%</p>
        </div>
        <div>
          <p>Среднемесячная доходность</p>
          <p>+333.8%</p>
        </div>
        <div>
          <p>Количество сделок</p>
          <p>+333.8%</p>
        </div>
        <div>
          <p>Прибыльных сделок в %</p>
          <p>+333.8%</p>
        </div>
        <div>
          <p>Убыточных сделок в %</p>
          <p>+333.8%</p>
        </div>
        <div>
          <p>Макс. просадка в %</p>
          <p>+333.8%</p>
        </div>
      </div>
    </div>
  );
}

export default AlgorithmType;
