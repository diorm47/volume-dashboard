import React, { useState } from "react";
import AlgoColumnChart from "../../components/algotype-charts/algo-type-column";
import AlgoLineChart from "../../components/algotype-charts/algo-type-line";
import "./algorithm-type.css";
import { ReactComponent as Icon } from "../../assets/icons/tarif-icon.svg";

import trade14 from "../../assets/images/trade/14.png";
import trade18 from "../../assets/images/trade/18.png";
import trade19 from "../../assets/images/trade/19.png";
import trade21 from "../../assets/images/trade/21.png";
import trade23 from "../../assets/images/trade/23.png";
import trade24 from "../../assets/images/trade/24.png";
import trade26 from "../../assets/images/trade/26.png";
import trade27 from "../../assets/images/trade/27.png";
import trade33 from "../../assets/images/trade/33.png";
import trade34 from "../../assets/images/trade/34.png";
import trade35 from "../../assets/images/trade/35.png";
import trade5 from "../../assets/images/trade/5.png";
import trade6 from "../../assets/images/trade/6.png";
import trade8 from "../../assets/images/trade/8.png";
import { useTranslation } from "react-i18next";

function AlgorithmType() {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = `Sigma AI | &Volume`;
  }, [t]);
  const [allPnl, setAllPnl] = useState(0);
  const [allPnlDown, setAllPnlDown] = useState(0);

  return (
    <div className="pages_wrapper investments_page algorithm_type_page">
      <div className="main_page_title_template">
        <h1>Sigma AI</h1>
      </div>
      <div className="top_page_attention_wrapper container">
        <div>
          {" "}
          <Icon />
        </div>
        <p>{t("algo_type_sigma.warning")}</p>
      </div>
      <div className="algo_type_top_cards">
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2> {t("algo_type_sigma.doxod")}</h2>
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
              <h2>{t("algo_type_sigma.min_pros")}</h2>
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
              <h2>{t("algo_type_sigma.risk")}</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content">
              <div className="review_left_top_block_content_amount">
                <p>{t("algo_type_sigma.medium")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>{t("algo_type_sigma.exchange")}</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content">
              <div className="review_left_top_block_content_amount">
                <p>Futures</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="algorithm_type_bottom_blocks">
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>{t("algo_type_sigma.testing")}</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content algo_type_stats">
              <div>
                <p>{t("algo_type_sigma.testing2")}</p>
                <p>01.01.2021</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.testing3")}</p>
                <p>{allPnl}%</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.testing4")}</p>
                <p>+226.01%</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.testing5")}</p>
                <p>+18.58 %</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.testing6")}</p>
                <p>4760</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.testing7")}</p>
                <p>72.58%</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.testing8")}</p>
                <p>27.42%</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.testing9")}</p>
                <p>{allPnlDown}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main_block_wrapper">
          <div className="main_block_wrapper_top">
            <div className="main_block_wrapper_title">
              <h2>{t("algo_type_sigma.rec")}</h2>
            </div>
          </div>
          <div className="main_block_wrapper_bottom">
            <div className="review_left_top_block_content algo_type_stats">
              <div>
                <p>{t("algo_type_sigma.mindep")}</p>
                <p>$100</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.rec_dep")}</p>
                <p>$1 000</p>
              </div>
              <div>
                <p>{t("algo_type_sigma.rec_w")}</p>
                <p>{t("algo_type_sigma.time")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main_block_wrapper">
        <div className="main_block_wrapper_top">
          <div className="main_block_wrapper_title">
            <h2>{t("algo_type_sigma.pairs")}</h2>
          </div>
        </div>
        <div className="main_block_wrapper_bottom">
          <div className="algorithm_pairs_list">
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade5} alt="" />
                <p>FLOWUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade6} alt="" />
                <p>ALGOUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade8} alt="" />
                <p>1INCHUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade14} alt="" />
                <p>HBARUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade21} alt="" />
                <p>GRTUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade23} alt="" />
                <p>NEARUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade24} alt="" />
                <p>AXSUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade26} alt="" />
                <p>ADAUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade27} alt="" />
                <p>DOTUSDT</p>
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
                <img src={trade34} alt="" />
                <p>SANDUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade35} alt="" />
                <p>SNXUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade19} alt="" />
                <p>LDOUSDT</p>
              </div>{" "}
            </div>
            <div className="drop_api_item">
              <div className="drop_api_item_name">
                <img src={trade18} alt="" />
                <p>APTUSDT</p>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="main_block_wrapper algorithm_type_desc">
        <div className="main_block_wrapper_top">
          <div className="main_block_wrapper_title">
            <h2>{t("algo_type_sigma.det")}</h2>
          </div>
        </div>
        <div className="main_block_wrapper_bottom">
          <div className="review_left_top_block_content">
            <div className="review_left_top_block_content_amount">
              <p>
                <b>{t("algo_type_sigma_d.title1")}</b>
              </p>
              <p>{t("algo_type_sigma_d.desc11")}</p>
              <p>{t("algo_type_sigma_d.desc12")}</p>
              <p>{t("algo_type_sigma_d.desc13")}</p>
              <p>
                <b> {t("algo_type_sigma_d.title2")}</b>
              </p>
              <p>
              {t("algo_type_sigma_d.desc21")}
              </p>
              <p>
              {t("algo_type_sigma_d.desc22")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="secondary_block_wrapper p0 algorithm_type_chart">
        <div className="main_block_wrapper_title">
          <h2>{t("algo_type_sigma_d.pnl")}</h2>
        </div>

        <AlgoLineChart setAllPnl={setAllPnl} setAllPnlDown={setAllPnlDown} />
      </div>
      <div className="secondary_block_wrapper algorithm_type_chart">
        <div className="main_block_wrapper_title">
          <h2>{t("algo_type_sigma_d.pnl_m")}</h2>
        </div>

        <AlgoColumnChart />
      </div>
    </div>
  );
}

export default AlgorithmType;
