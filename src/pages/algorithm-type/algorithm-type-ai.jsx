import React, { useState } from "react";
import AlgoColumnChart from "../../components/algotype-charts-ai/algo-type-column";
import AlgoLineChart from "../../components/algotype-charts-ai/algo-type-line";
import "./algorithm-type.css";
import { ReactComponent as Icon } from "../../assets/icons/tarif-icon.svg";

import trade1 from "../../assets/images/trade/1.png";
import trade2 from "../../assets/images/trade/2.png";
import trade3 from "../../assets/images/trade/3.png";
import trade4 from "../../assets/images/trade/4.png";
import trade5 from "../../assets/images/trade/5.png";
import trade6 from "../../assets/images/trade/6.png";
import trade7 from "../../assets/images/trade/7.png";
import trade8 from "../../assets/images/trade/8.png";
import trade9 from "../../assets/images/trade/9.png";
import trade10 from "../../assets/images/trade/10.png";
import trade11 from "../../assets/images/trade/11.png";
import trade12 from "../../assets/images/trade/12.png";
import trade13 from "../../assets/images/trade/13.png";
import trade14 from "../../assets/images/trade/14.png";
import trade15 from "../../assets/images/trade/15.png";
import trade16 from "../../assets/images/trade/16.png";
import trade17 from "../../assets/images/trade/17.png";
import trade18 from "../../assets/images/trade/18.png";
import trade19 from "../../assets/images/trade/19.png";
import trade20 from "../../assets/images/trade/20.png";
import trade21 from "../../assets/images/trade/21.png";
import trade22 from "../../assets/images/trade/22.png";
import trade23 from "../../assets/images/trade/23.png";
import trade24 from "../../assets/images/trade/24.png";
import trade25 from "../../assets/images/trade/25.png";
import trade26 from "../../assets/images/trade/26.png";
import trade27 from "../../assets/images/trade/27.png";
import trade28 from "../../assets/images/trade/28.png";
import trade29 from "../../assets/images/trade/29.png";
import trade30 from "../../assets/images/trade/30.png";
import trade31 from "../../assets/images/trade/31.png";
import trade32 from "../../assets/images/trade/32.png";
import trade33 from "../../assets/images/trade/33.png";
import trade34 from "../../assets/images/trade/34.png";
import trade35 from "../../assets/images/trade/35.png";
import trade36 from "../../assets/images/trade/36.png";
import trade37 from "../../assets/images/trade/37.png";
import trade38 from "../../assets/images/trade/38.png";
import trade39 from "../../assets/images/trade/39.png";

function AlgorithmTypeAi() {
  const [allPnl, setAllPnl] = useState(0);
  const [allPnlDown, setAllPnlDown] = useState(0);

  return (
    <div className="pages_wrapper investments_page algorithm_type_page">
      <div className="main_page_title_template">
        <h1>Delta</h1>
      </div>
      <div className="top_page_attention_wrapper container">
        <div>
          {" "}
          <Icon />
        </div>
        <p>
          Информация на странице получена по результатам тестирования алгоритма
          на историческом периоде и не может гарантировать аналогичную
          эффективность в будущем.
        </p>
      </div>
      <div className="algo_type_top_cards">
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>Доходность за все время</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content">
              <div className="review_left_top_block_content_amount">
                {allPnl && allPnl > 0 ? (
                  <p className="algo_type_top_card_green">+ {allPnl} %</p>
                ) : (
                  ""
                )}
                {allPnl && allPnl < 0 ? (
                  <p className="algo_type_top_card_red"> {allPnl} %</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>Максимальная просадка</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content">
              <div className="review_left_top_block_content_amount">
                <p className="algo_type_top_card_red"> {allPnlDown} % </p>
              </div>
            </div>
          </div>
        </div>
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>Риск</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content">
              <div className="review_left_top_block_content_amount">
                <p>Минимальный</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>Тип рынка</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content">
              <div className="review_left_top_block_content_amount">
                <p>Spot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="algorithm_type_bottom_blocks">
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>Результаты тестирования</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content algo_type_stats">
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
        </div>
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>Рекомендации</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content algo_type_stats">
              <div>
                <p>Минимальный депозит</p>
                <p>$300</p>
              </div>
              <div>
                <p>Рекомендуемый депозит</p>
                <p>$3 000</p>
              </div>
              <div>
                <p>Рекомендуемый срок работы</p>
                <p>от 3 месяцев</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main_block_wrapper">
        <div className="main_block_wrapper_top">
          <div className="main_block_wrapper_title">
            <h2>Торгуемые пары</h2>
          </div>
        </div>
        <div className="main_block_wrapper_bottom">
          <div className="algorithm_pairs_list">
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade26} alt="" />
                <p>ADAUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade33} alt="" />
                <p>AVAXUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade1} alt="" />
                <p>BTCUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade38} alt="" />
                <p>ETCUSDT</p>
              </div>{" "}
            </div>{" "}
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade9} alt="" />
                <p>ETHUSDT</p>
              </div>{" "}
            </div>{" "}
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade39} alt="" />
                <p>SOLUSDT</p>
              </div>{" "}
            </div>{" "}
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade36} alt="" />
                <p>XLMUSDT</p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="main_block_wrapper algorithm_type_desc">
        <div className="main_block_wrapper_top">
          <div className="main_block_wrapper_title">
            <h2>Описание</h2>
          </div>
        </div>
        <div className="main_block_wrapper_bottom">
          <div className="review_left_top_block_content">
            <div className="review_left_top_block_content_amount">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="secondary_block_wrapper p0 algorithm_type_chart">
        <div className="main_block_wrapper_title">
          <h2>График PnL</h2>
        </div>

        <AlgoLineChart setAllPnl={setAllPnl} setAllPnlDown={setAllPnlDown} />
      </div>
      <div className="secondary_block_wrapper algorithm_type_chart">
        <div className="main_block_wrapper_title">
          <h2>График PnL по месяцам</h2>
        </div>

        <AlgoColumnChart />
      </div>
    </div>
  );
}

export default AlgorithmTypeAi;
