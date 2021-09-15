import React from "react";
import { Container } from "@material-ui/core";
import catalog_icon from "../../assets/channel/list/Group 2.png";
import manual_icon from "../../assets/channel/list/Group 147.png";
import bulk_icon from "../../assets/channel/list/Group 4.png";
import we_icon from "../../assets/channel/list/Group 148.png";
import back_icon from "../../assets/channel/flags/back.png";
import ProgressBar from "./ProgressBar";
import { useHistory } from "react-router-dom";
import MbProgressBar from "./MbProgressBar";
import Previousstep from "../SmallComponents/Previousstep";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";
setTranslations({ en });
setDefaultLanguage("en");
function ChooseList({
  nextStep,
  handleChangeList,
  values,
  step,
  prevStep,
  platform,
  list,
}: any) {
  const history = useHistory();

  const handleRoute = () => {
    history.push("/home");
  };

  const Continue = (e: any) => {
    e.preventDefault();
    nextStep();
  };
  const Previous = (e: any) => {
    e.preventDefault();
    prevStep();
  };
  const t = useTranslation();
  return (
    <Container component="main" maxWidth="lg">
      <div>
        <form>
          <div className="row mx-auto">
            <div className="col-12 my-2 d-block d-xl-none px-0">
              <MbProgressBar platform={platform} step={step} />
            </div>
            <div className="col-lg-8 shade-Channel mb-no-shade bg-white br-8 pb-xl-5">
              <Previousstep Previous={Previous} />
              <div className="row mx-auto px-lg-5 px-md-3">
                <div className="text-center mx-auto col-md-6 px-0 px-md-2">
                  <h5 className="font-weight-bold mb-0">{t("step5h")}</h5>
                </div>

                <div className="col-md-10 mx-auto col-6 px-md-3 px-0 mb-2">
                  <label className="mb-0 h-100">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-element"
                      value={"catalog"}
                      onChange={(e) => handleChangeList("catalog")}
                    />
                    <div
                      className={`panel panel-default card-input shade-card br-8 h-100 my-1 py-1 py-md-0
                      ${
                        list == "catalog"
                          ? "border border-primary bg-sm-purple"
                          : ""
                      }
                      `}
                    >
                      <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
                        <div className="">
                          <img
                            src={catalog_icon}
                            alt="icon"
                            className={`w-md-100 ${
                              list == "catalog" ? "filter-white" : ""
                            }`}
                          />
                        </div>
                        <div className="px-md-2">
                          <h5
                            className={`font-weight-bold d-blue ${
                              list == "catalog" ? "text-sm-white" : ""
                            }`}
                          >
                            {t("cata")}
                          </h5>
                          <div className="lh-1 d-md-block d-none">
                            {t("catapara")}
                          </div>
                        </div>
                        <div className="text-right d-md-block d-none">
                          <i className="fas d-blue fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-10 mx-auto col-6  px-md-3 px-0 mb-2">
                  <label className="mb-0 h-100">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-element"
                      value={"Manual"}
                      onChange={(e) => handleChangeList("manual")}
                    />
                    <div
                      className={`panel panel-default card-input shade-card br-8 h-100 my-1 py-1 
                      ${
                        list == "manual"
                          ? "border border-primary bg-sm-purple"
                          : ""
                      }
                      `}
                    >
                      <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
                        <div className="">
                          <img
                            src={manual_icon}
                            alt="icon"
                            className={`w-md-100 ${
                              list == "manual" ? "filter-white" : ""
                            }`}
                          />
                        </div>
                        <div className="px-md-2">
                          <h5
                            className={`font-weight-bold d-blue ${
                              list == "manual" ? "text-sm-white" : ""
                            }`}
                          >
                            {t("manual")}
                          </h5>
                          <div className="lh-1 d-md-block d-none">
                            {t("manualpara")}
                          </div>
                        </div>
                        <div className="text-right d-md-block d-none">
                          <i className="fas d-blue fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-10 mx-auto col-6 px-md-3 px-0 mb-2">
                  <label className="mb-0 h-100">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-element"
                      value={"bulk"}
                      onChange={(e) => handleChangeList("bulk")}
                    />
                    <div
                      className={`panel panel-default card-input shade-card br-8 h-100 my-1 py-1 py-md-0 
                      ${
                        list == "bulk"
                          ? "border border-primary bg-sm-purple"
                          : ""
                      }
                      `}
                    >
                      <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
                        <div className="">
                          <img
                            src={bulk_icon}
                            alt="icon"
                            className={`w-md-100 ${
                              list == "bulk" ? "filter-white" : ""
                            }`}
                          />
                        </div>
                        <div className="px-md-2">
                          <h5
                            className={`font-weight-bold d-blue ${
                              list == "bulk" ? "text-sm-white" : ""
                            }`}
                          >
                            {t("bulk")}
                          </h5>
                          <div className="lh-1 d-md-block d-none">
                            {t("bulkpara")}
                          </div>
                        </div>
                        <div className="text-right d-md-block d-none">
                          <i className="fas d-blue fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                {platform == "ebay" ? (
                  <>
                    <div className="col-md-10 mx-auto col-6 px-md-3 px-0 mb-2">
                      <label className="mb-0 h-100">
                        <input
                          type="radio"
                          name="product"
                          className="card-input-element"
                          value={"we"}
                          onChange={(e) => handleChangeList("we")}
                        />
                        <div
                          className={`panel panel-default card-input shade-card br-8 h-100 my-1 py-1
                      ${
                        list == "we" ? "border border-primary bg-sm-purple" : ""
                      }
                      `}
                        >
                          <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
                            <div className="">
                              <img
                                src={we_icon}
                                alt="icon"
                                className={`w-md-100 ${
                                  list == "we" ? "filter-white" : ""
                                }`}
                              />
                            </div>
                            <div className="px-md-2">
                              <h5
                                className={`font-weight-bold d-blue ${
                                  list == "we" ? "text-sm-white" : ""
                                }`}
                              >
                                {t("welist")}
                              </h5>
                              <div className="lh-1 d-md-block d-none">
                                {t("welistpara")}
                              </div>
                              <button className="bg-success border-0 text-white br-8 mt-2 sale-tag">
                                {t("btnlist")}
                              </button>
                            </div>
                            <div className="text-right d-md-block d-none">
                              <i className="fas d-blue fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="mx-auto text-md-center text-right col-12 mt-2 next-fix">
                  <div className="d-block d-md-none text-center w-100">
                    <div
                      className={`text-danger w-100 text-center font-weight-bold ${
                        values.list == "" ? "" : "d-none"
                      } `}
                    >
                      {t("listcheck")}
                    </div>
                  </div>
                  <div className="d-block d-md-none">
                    <div
                      className={`w-100 text-center my-4 py-5 font-weight-bold ${
                        values.list == "" ? "d-none" : ""
                      } `}
                    >
                      <h5 className="font-weight-bold d-blue mb-0">
                        {list == "catalog"
                          ? " Catalog Listing"
                          : list == "manual"
                          ? " Manual Listing"
                          : list == "bulk"
                          ? "Manual Listing"
                          : list == "we"
                          ? "We List for you"
                          : ""}
                      </h5>
                      <div>{t("favsupp")}</div>
                    </div>
                  </div>
                  <button
                    onClick={handleRoute}
                    type="submit"
                    disabled={values.list == ""}
                    className={`border-0 bg-trans mx-auto ${
                      values.list == "" ? "btn-disbaled text-grey" : "d-blue"
                    } `}
                  >
                    <div className="d-flex align-items-center">
                      <span className="font-weight-bold">{t("fininsh")} </span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                    </div>
                  </button>
                  <div className="d-md-block d-none w-100 text-center lh-1">
                    <div
                      className={` text-danger w-100 text-center font-weight-bold ${
                        values.list == "" ? "" : "d-none"
                      } `}
                    >
                      {t("listcheck")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-xl-block d-none m-auto">
              <ProgressBar platform={platform} step={step} />
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ChooseList;
