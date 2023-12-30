import React, { useEffect } from "react";
import "./base.css";

import baseBottom from "../../assets/images/base-bottom.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Base() {
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("faqBlock.knowledgeBase")} | &Volume`;
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [localStorage.getItem("token")]);
  return (
    <div className="base_page_wrapper">
      <div className="base_top_block">
        <div className="base_top_block_wrapper">
          <div>
            <p>{t("faqBlock.knowledgeBase")}</p>
            <h1>{t("faqBlock.frequentlyAskedQuestions")}</h1>
          </div>
        </div>
      </div>

      <div className="pages_wrapper">
        <div className="base_questions">
          <div className="base_questions_column">
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>{t("baseQuestionsColumn.connection")}</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/register-acc">
                    <div>
                      <p>{t("baseQuestionsColumn.registration")}</p>
                      <span>
                        {t("baseQuestionsColumn.registrationDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/api">
                    <div>
                      <p>{t("baseQuestionsColumn.api")}</p>
                      <span>{t("baseQuestionsColumn.apiDescription")}</span>
                    </div>
                  </NavLink>
                </div>

                <div>
                  <NavLink to="/base-investing">
                    <div>
                      <p>{t("baseQuestionsColumn.investments")}</p>
                      <span>
                        {t("baseQuestionsColumn.investmentsDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>{t("baseQuestionsColumn.buySellCrypto")}</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/topup-types">
                    <div>
                      <p>{t("baseQuestionsColumn.topupMethods")}</p>
                      <span>
                        {t("baseQuestionsColumn.topupMethodsDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <NavLink to="/p2p">
                    <div>
                      <p>{t("baseQuestionsColumn.p2pTrading")}</p>
                      <span>
                        {t("baseQuestionsColumn.p2pTradingDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="base_questions_column">
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>{t("baseQuestionsColumn2.investments")}</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/differences">
                    <div>
                      <p>{t("baseQuestionsColumn2.differences")}</p>
                      <span>
                        {t("baseQuestionsColumn2.differencesDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <p>
                    {t("baseQuestionsColumn2.statistics")}{" "}
                    <button>{t("common.inDevelopment")}</button>
                  </p>
                  <span>{t("baseQuestionsColumn2.statisticsDescription")}</span>
                </div>

                <div>
                  <NavLink to="/risks">
                    <div>
                      <p>{t("baseQuestionsColumn2.risks")}</p>
                      <span>{t("baseQuestionsColumn2.risksDescription")}</span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>{t("baseQuestionsColumn2.rewardsReferrals")}</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <p>
                    {t("baseQuestionsColumn2.partners")}{" "}
                    <button>{t("common.inDevelopment")}</button>
                  </p>
                  <span>{t("baseQuestionsColumn2.partnersDescription")}</span>
                </div>
                <div>
                  <p>
                    {t("baseQuestionsColumn2.invitation")}{" "}
                    <button>{t("common.inDevelopment")}</button>
                  </p>
                  <span>{t("baseQuestionsColumn2.invitationDescription")}</span>
                </div>
                <div>
                  <p>
                    {t("baseQuestionsColumn2.referralRewards")}{" "}
                    <button>{t("common.inDevelopment")}</button>
                  </p>
                  <span>
                    {t("baseQuestionsColumn2.referralRewardsDescription")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="base_questions_column">
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>{t("baseQuestionsColumn3.tariffs")}</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink to="/limits">
                    <div>
                      <p>{t("baseQuestionsColumn3.tradeLimits")}</p>
                      <span>
                        {t("baseQuestionsColumn3.tradeLimitsDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <p>
                    {t("baseQuestionsColumn3.payment")}{" "}
                    <button>{t("common.inDevelopment")}</button>
                  </p>
                  <span>{t("baseQuestionsColumn3.paymentDescription")}</span>
                </div>
              </div>
            </div>
            <div className="secondary_block_wrapper base_question_card">
              <div className="main_block_wrapper_title">
                <h2>{t("baseQuestionsColumn3.other")}</h2>
              </div>
              <div className="order_history_list_line"></div>
              <div className="base_question_card_content">
                <div>
                  <NavLink
                    target="_blank"
                    to="https://nvolume.com/white-paper.html"
                  >
                    <div>
                      <p>{t("baseQuestionsColumn3.whitepaper")}</p>
                      <span>
                        {t("baseQuestionsColumn3.whitepaperDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    target="_blank"
                    to="https://nvolume.com/agreement.html"
                  >
                    <div>
                      <p>{t("baseQuestionsColumn3.clientAgreement")}</p>
                      <span>
                        {t("baseQuestionsColumn3.clientAgreementDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
                <div>
                  <NavLink target="_blank" to="https://nvolume.com/policy.html">
                    <div>
                      <p>{t("baseQuestionsColumn3.privacyPolicy")}</p>
                      <span>
                        {t("baseQuestionsColumn3.privacyPolicyDescription")}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="base_block_title">
          <h2>Последние новости</h2>
        </div>
        <div className="base_news">
          <div className="secondary_block_wrapper base_question_card">
            <div className="main_block_wrapper_title">
              <h2>Уведомление о изменение платежной системы на &volume</h2>
            </div>
            <div className="order_history_list_line"></div>
            <div className="base_question_card_content">
              <div>
                <span>
                  С радостью сообщаем вам об обновлении нашей платежной системы.
                  Мы переходим на современную и надежную систему, чтобы
                  обеспечить вам еще более удобные и безопасные платежи. <br />
                  <br /> 20.11.2023, 16:00:31
                </span>
              </div>
            </div>
          </div>
          <div className="secondary_block_wrapper base_question_card">
            <div className="main_block_wrapper_title">
              <h2>Уведомление о изменение платежной системы на &volume</h2>
            </div>
            <div className="order_history_list_line"></div>
            <div className="base_question_card_content">
              <div>
                <span>
                  С радостью сообщаем вам об обновлении нашей платежной системы.
                  Мы переходим на современную и надежную систему, чтобы
                  обеспечить вам еще более удобные и безопасные платежи. <br />
                  <br /> 20.11.2023, 16:00:31
                </span>
              </div>
            </div>
          </div>
          <div className="secondary_block_wrapper base_question_card">
            <div className="main_block_wrapper_title">
              <h2>Уведомление о изменение платежной системы на &volume</h2>
            </div>
            <div className="order_history_list_line"></div>
            <div className="base_question_card_content">
              <div>
                <span>
                  С радостью сообщаем вам об обновлении нашей платежной системы.
                  Мы переходим на современную и надежную систему, чтобы
                  обеспечить вам еще более удобные и безопасные платежи. <br />
                  <br /> 20.11.2023, 16:00:31
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="base_bottom_blocks">
          <div className="secondary_block_wrapper base_bottom_block">
            <div className="base_bottom_blocks_left">
              <p>{t("haveQuestions")}</p>
              <span>{t("readyToHelp")}</span>
              <a target="_blank" href="https://t.me/NvolumeSupport_bot">
                <button>{t("openChat")}</button>
              </a>
            </div>
            <img src={baseBottom} alt="" />
          </div>
          <div className="secondary_block_wrapper base_bottom_block">
            <div className="base_bottom_blocks_left">
              <p>{t("suggestImprovement")}</p>
              <span>{t("whatWouldYouLikeToImprove")}</span>
              <button>{t("suggestIdea")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Base;
