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

function ReferalPage() {
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
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getReferalsList();
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

  const closeModals = () => {
    setModal1(false);
    setModal2(false);
  };
  return (
    <>
      <div className="pages_wrapper referal_page">
        <div className="referal_page_wrapper">
          <div className="ref_top main_block_wrapper ref_block">
            <div class="main_block_wrapper_top">
              <div class="main_block_wrapper_title secondary_title">
                <h2 className="color_white">Доход</h2>
                <p>Здесь отображается ваш доход с рефералов</p>
                <div className="ref_bonus">
                  <div className="ref_bonuses ">
                    <div>
                      <p className="color_white">Общий доход</p>
                      <span className="color_white">30.00 USDT</span>
                    </div>
                    <div>
                      <p className="color_white">Доступно</p>
                      <span className="color_white">30.00 USDT</span>
                    </div>
                  </div>

                  <button
                    className="ref_bonus_output"
                    onClick={() => setModal1(true)}
                  >
                    Вывести
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="ref_top main_block_wrapper ref_block">
            <div class="main_block_wrapper_top">
              <div class="main_block_wrapper_title secondary_title">
                <h2>Реферальная ссылка</h2>
                <p>Здесь отображается ваша актуальная реферальная ссылка</p>
                <p className="marg_ref">Ссылка</p>
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
                <h2>Рефералы</h2>
                <p>Здесь отображается список ваших рефералов</p>
              </div>
              <div className="refs_list marg_ref">
                <div className="refs_list_title">
                  <p>ID Пользователя</p>
                  <p>Оплаченный тариф</p>
                  <p>Доход</p>
                  <p>Дата регистрации</p>
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
                      <p>Нет рефералов</p>
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
          <p>Заявка на вывод</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content api_modal_content">
          <div className="modal_wrapper_content_item">
            <div className="modal_wrapper_content_item_title">
              <p>Выберите валюту вывода</p>
              <Info />
            </div>
            <div className="output_item">
              <div className="output_item_left">
                <Tether />
                <span>Tether</span>
                <p>TRC20</p>
              </div>
              <div className="output_item_amount">
                <p>30.00 USDT</p>
              </div>
            </div>
          </div>
          <div className="modal_wrapper_content_item wallet_adress">
            <div className="modal_wrapper_content_item_title">
              <p>Адрес кошелька для перевода</p>
              <Info />
            </div>
            <input type="text" />
          </div>
          <div className="output_desc">
            <div className="output_desc_item">
              <div className="output_desc_item_icon">
                <Output1 />
              </div>{" "}
              <p>
                В рабочие дни с 10:00 до 20:00 (GMT+3) вывод осуществляется в{" "}
                <br />
                течение рабочего дня. В остальное время — на следующий день.
              </p>
            </div>
            <div className="output_desc_item">
              <div className="output_desc_item_icon">
                <Output2 />
              </div>{" "}
              <p>
                К выводу доступна только полная сумма, хранящаяся на балансе.
              </p>
            </div>
            <div className="output_desc_item">
              <div className="output_desc_item_icon">
                <Output3 />{" "}
              </div>
              <p>Минимальная сумма вывода 100 USDT.</p>
            </div>
          </div>

          <div className="output_btn">
            <p>шаг 1 из 2</p>
            <div className="modal_wrapper_save_btn">
              <button>Далее</button>
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
          <p>Заявка на вывод</p>
          <ExitModal onClick={closeModals} />
        </div>
        <div className="modal_wrapper_content api_modal_content">
          <div className="output_agree">
            <p>Вы отправляете:</p>
            <h2>30.00 USDT</h2>
            <p>Адрес:</p>
            <span>brA1UU9fnU1BqbdNw7PoFgXg8Bf7xVWdxq</span>
          </div>

          <div className="output_btn">
            <p>шаг 2 из 2</p>
            <div className="modal_wrapper_save_btn">
              <button onClick={closeModals}>Вывод средств</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReferalPage;
