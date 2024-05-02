import React, { useEffect, useState } from "react";
import "./referal.css";
import { mainApi } from "../../components/utils/main-api";
import empty_block from "../../assets/icons/empty-block.png";
import Snackbar from "../../components/snackbar/snackbar";
import { ReactComponent as Info } from "../../assets/icons/info.svg";
import { ReactComponent as ExitModal } from "../../assets/icons/exit-modal.svg";
import { ReactComponent as Tether } from "../../assets/icons/tether.svg";
import { ReactComponent as Output1 } from "../../assets/icons/output-1.svg";
import { ReactComponent as Output2 } from "../../assets/icons/output-2.svg";
import { ReactComponent as Output3 } from "../../assets/icons/output-3.svg";
import { useTranslation } from "react-i18next";

function ReferalPage() {
  const userLanguage = localStorage.getItem("locale") || "ru";
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState("");
  const [snackStatus, setSnackStatus] = useState("");
  const snackOptions = (text, status) => {
    setVisibleSnack(true);
    setSnackText(text);
    setSnackStatus(status);
    setTimeout(() => {
      setVisibleSnack(false);
    }, 2000);
  };

  const [refCode, setRefCode] = useState("");
  const [refBalance, setRefBalance] = useState({});
  const [refsList, setRefList] = useState([]);

  const getReferalsList = () => {
    mainApi
      .getReferals()
      .then((res) => {
        setRefList(res.data.referrals);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getReferalsBalance = () => {
    mainApi
      .getReferalsBalance()
      .then((res) => {
        setRefBalance(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getReferalsList();
      getReferalsBalance();
      mainApi
        .reEnter()
        .then((res) => {
          setRefCode(res.data.user.referral_code);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [localStorage.getItem("token")]);

  const copyToClipboard = () => {
    const url = `https://dashboard.nvolume.com/auth?ref=${refCode}`;
    navigator.clipboard
      .writeText(url)
      .then(() => snackOptions("Ссылка скопирована!", "success"))
      .catch(() => snackOptions("Ошибка при копировании", "errpr"));
  };

  // output
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [wallet, setWallet] = useState("");

  const closeModals = () => {
    setModal1(false);
    setModal2(false);
  };
  const { t } = useTranslation();
  const setSecondModal = () => {
    setModal1(false);
    setModal2(true);
  };

  const widrawalBalance = () => {
    const localization = {
      en: {
        requestSuccess: "Success!",
        requestError: "Error!",
      },
      ru: {
        requestSuccess: "Удачно",
        requestError: "Ошибка!",
      },
    };

    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let bodyContent = new FormData();
    bodyContent.append("network", "trc20");
    bodyContent.append("wallet", wallet);

    fetch("https://api.nvolume.com/private-api/v1/users/referrals/withdrawal", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          closeModals();
          snackOptions(localization[userLanguage].requestSuccess, "success");
          getReferalsBalance()
        } else {
          snackOptions(localization[userLanguage].requestError, "error");
        }
      })
      .catch((error) => {
        console.log(error);
        snackOptions(localization[userLanguage].requestError, "error");
      });
  };

  return (
    <>
      <div className="pages_wrapper referal_page">
        <div className="referal_page_wrapper">
          <div className="ref_top main_block_wrapper ref_block">
            <div class="main_block_wrapper_top">
              <div class="main_block_wrapper_title secondary_title">
                <h2 className="color_white">{t("ref_1_block.title")}</h2>
                <p>{t("ref_1_block.desc")}</p>
                <div className="ref_bonus">
                  <div className="ref_bonuses ">
                    <div>
                      <p className="color_white">{t("ref_1_block.all")}</p>
                      <span className="color_white">
                        {refBalance.all_time_amount || 0.0} USDT
                      </span>
                    </div>
                    <div>
                      <p className="color_white">{t("ref_1_block.have")}</p>
                      <span className="color_white">
                        {refBalance.balance || 0.0} USDT
                      </span>
                    </div>
                  </div>

                  <button
                    className="ref_bonus_output"
                    onClick={() => setModal1(true)}
                  >
                    {t("ref_1_block.btn")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="ref_top main_block_wrapper ref_block">
            <div class="main_block_wrapper_top">
              <div class="main_block_wrapper_title secondary_title">
                <h2>{t("ref_2_block.title")}</h2>
                <p>{t("ref_2_block.desc")}</p>
                <p className="marg_ref">{t("ref_2_block.link")}</p>
                <div className="ref_line"></div>
                <div className="ref_link">
                  <p className="color_white">
                    {" "}
                    {`https://dashboard.nvolume.com/auth?ref=${refCode}`}
                  </p>
                  <div className="copy_icon" onClick={copyToClipboard}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4.66663 6.44467C4.66663 5.97311 4.85395 5.52087 5.18739 5.18743C5.52083 4.85399 5.97307 4.66667 6.44463 4.66667H12.222C12.4554 4.66667 12.6867 4.71266 12.9024 4.80201C13.1181 4.89136 13.3141 5.02233 13.4792 5.18743C13.6443 5.35253 13.7753 5.54854 13.8646 5.76426C13.954 5.97997 14 6.21118 14 6.44467V12.222C14 12.4555 13.954 12.6867 13.8646 12.9024C13.7753 13.1181 13.6443 13.3141 13.4792 13.4792C13.3141 13.6443 13.1181 13.7753 12.9024 13.8647C12.6867 13.954 12.4554 14 12.222 14H6.44463C6.21114 14 5.97993 13.954 5.76421 13.8647C5.5485 13.7753 5.35249 13.6443 5.18739 13.4792C5.02229 13.3141 4.89132 13.1181 4.80197 12.9024C4.71262 12.6867 4.66663 12.4555 4.66663 12.222V6.44467Z"
                        stroke="#92979C"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.67467 11.158C2.47023 11.0415 2.30018 10.873 2.18172 10.6697C2.06325 10.4663 2.00057 10.2353 2 10V3.33333C2 2.6 2.6 2 3.33333 2H10C10.5 2 10.772 2.25667 11 2.66667"
                        stroke="#92979C"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ref_bottom main_block_wrapper ref_block">
            <div class="main_block_wrapper_top">
              <div class="main_block_wrapper_title secondary_title">
                <h2>{t("ref_3_block.title")}</h2>
                <p>{t("ref_3_block.desc")}</p>
              </div>
              <div className="refs_list marg_ref">
                <div className="refs_list_title">
                  <p>{t("ref_3_block.thead1")}</p>
                  <p>{t("ref_3_block.thead2")}</p>
                  <p>{t("ref_3_block.thead3")}</p>
                  <p>{t("ref_3_block.thead4")}</p>
                </div>
                <div className="ref_line"></div>
                <div className="refs_content">
                  {refsList && refsList.length ? (
                    refsList.map((ref, index) => (
                      <div key={index} className="refs_content_item_wrapper">
                        <div className="refs_content_item ">
                          <p>ID {ref.referral_id}</p>
                          <p>{ref.created_at.split(" ")[0]}</p>
                        </div>
                        <div className="ref_line"></div>
                      </div>
                    ))
                  ) : (
                    <div className="empty_block">
                      <img src={empty_block} alt="" />
                      <p>{t("ref_3_block.empty")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          text={snackText}
          status={snackStatus}
          visible={visibleSnack}
        />
      </div>

      <div
        className={modal1 || modal2 ? "overlay visible_overlay" : "overlay"}
        onClick={closeModals}
      ></div>

      <div
        className={
          modal1
            ? "modal_wrapper api_modal_wrapper visible_modal_wrapper"
            : "modal_wrapper api_modal_wrapper"
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("output1.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content api_modal_content">
          <div className="modal_wrapper_content_item">
            <div className="modal_wrapper_content_item_title">
              <p>{t("output1.btitle1")}</p>
              <Info />
            </div>
            <div className="output_item">
              <div className="output_item_left">
                <Tether />
                <span>Tether</span>
                <p>TRC20</p>
              </div>
              <div className="output_item_amount">
                <p>{refBalance.balance || 0.0} USDT</p>
              </div>
            </div>
          </div>
          <div className="modal_wrapper_content_item wallet_adress">
            <div className="modal_wrapper_content_item_title">
              <p>{t("output1.btitle2")}</p>
              <Info />
            </div>
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            />
          </div>
          <div className="output_desc">
            <div className="output_desc_item">
              <div className="output_desc_item_icon">
                <Output1 />
              </div>{" "}
              <p>
                {t("output1.desc1")} <br />
                {t("output1.desc1_1")}
              </p>
            </div>
            <div className="output_desc_item">
              <div className="output_desc_item_icon">
                <Output2 />
              </div>{" "}
              <p>{t("output1.desc2")}</p>
            </div>
            <div className="output_desc_item">
              <div className="output_desc_item_icon">
                <Output3 />{" "}
              </div>
              <p> {t("output1.desc3")}</p>
            </div>
          </div>

          <div className="output_btn">
            <p>{t("output1.path")}</p>
            <div className="modal_wrapper_save_btn">
              <button disabled={!wallet} onClick={setSecondModal}>
                {t("output1.btn")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          modal2
            ? "modal_wrapper api_modal_wrapper visible_modal_wrapper"
            : "modal_wrapper api_modal_wrapper"
        }
      >
        <div className="modal_wrapper_title">
          <p>{t("output2.title")}</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content api_modal_content">
          <div className="output_agree">
            <p>{t("output2.text1")}:</p>
            <h2>{refBalance.balance || 0.0} USDT</h2>
            <p>{t("output2.text2")}:</p>
            <span>{wallet}</span>
          </div>

          <div className="output_btn">
            <p>{t("output2.path")}</p>
            <div className="modal_wrapper_save_btn">
              <button onClick={widrawalBalance}>{t("output2.btn")}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferalPage;
