import React, { useState } from "react";
import { Container } from "@material-ui/core";

import ebay_logo from "../../assets/channel/ebay.png";
import shopify_logo from "../../assets/channel/shopify-2.png";
import amazon_logo from "../../assets/channel/amazon-2.png";
import ProgressBar from "./ProgressBar";
import MbProgressBar from "./MbProgressBar";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";
setTranslations({ en });
setDefaultLanguage("en");
function PlatForm({
  nextStep,
  handleChange,
  handleChangePlatform,
  platform,
  values,
  step,
}: any) {
  const Continue = (e: any) => {
    e.preventDefault();
    nextStep();
  };

  const [count, setCount] = useState(0);
  const t = useTranslation();
  return (
    <Container component="main" maxWidth="lg">
      <div>
        <form>
          <div className="row mx-auto">
            <div className="col-12 my-2 d-block d-xl-none px-0">
              <MbProgressBar step={step} />
            </div>
            <div className="col-xl-8 mt-2 pt-1 shade-Channel mb-no-shade bg-white br-8">
              <div className="row mx-auto px-lg-4 px-md-3">
                <div className="text-center col-12">
                  <h5 className="font-weight-bold mb-0">{t("liketosell")}</h5>
                </div>
                <div className="col-md-6 col-4 mt-md-1 px-0 px-md-2">
                  <label className="h-md-100">
                    <input
                      type="radio"
                      name="product"
                      value={"platform"}
                      className="card-input-element"
                      checked={platform == "ebay"}
                      onChange={(e) => handleChangePlatform("ebay")}
                    />
                    <div
                      className={`panel panel-default panel-platform card-input shade-card br-8 h-100
                    ${platform == "ebay" ? " " : ""}
                    
                    `}
                    >
                      <div className="mt-md-2 mb-md-2">
                        <img
                          src={ebay_logo}
                          className="w-res-100"
                          alt="ebay logo"
                        />
                      </div>
                      <div className="d-md-block d-none">
                        <div className=" font-weight-bold">{t("mrktplc")}</div>
                        <div className="panel-body">{t("ebayslctd")}</div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="col-md-6 col-4 mt-md-1 px-0 px-md-2">
                  <label className="h-md-100">
                    <input
                      type="radio"
                      name="product"
                      value={"platform"}
                      checked={platform == "shopify"}
                      className="card-input-element"
                      onChange={(e) => handleChangePlatform("shopify")}
                    />
                    <div
                      className={`panel panel-default panel-platform card-input shade-card br-8 h-100
                    ${platform == "shopify" ? "" : ""}
                    
                    `}
                    >
                      <div className="mt-md-2 mb-md-2">
                        <img
                          src={shopify_logo}
                          className="w-res-100"
                          alt="ebay logo"
                        />
                      </div>
                      <div className="d-md-block d-none">
                        <div className=" font-weight-bold">{t("onwstore")}</div>
                        <div className="panel-body">{t("shopslctd")}</div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-12 col-4 mt-md-2 px-0 px-md-2">
                  <label className="h-100">
                    <input
                      type="radio"
                      name="product"
                      value={"platform"}
                      checked={platform == "amazon"}
                      className="card-input-element"
                      onChange={(e) => handleChangePlatform("amazon")}
                    />
                    <div
                      className={`panel panel-default panel-platform card-input shade-card br-8 h-100
                    ${platform == "amazon" ? "" : ""}
                    
                    `}
                    >
                      <div className="mt-md-2 mb-md-4">
                        <img
                          src={amazon_logo}
                          className="w-res-100"
                          alt="ebay logo"
                        />
                      </div>
                      <div className="d-md-block d-none">
                        <div className=" font-weight-bold">{t("mrktplc")}</div>
                        <div className="panel-body">{t("amzsltcd")}</div>
                        <div>
                          <i className="font-weight-bold">{t("amzsub")}</i>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="row d-flex d-md-none mt-2 text-center h-resp-65">
                  {values.platform == "ebay" ? (
                    <div className="m-auto px-5">
                      <div className=" font-weight-bold h6 mb-0">
                        {t("mrktplc")}
                      </div>
                      <div className="panel-body px-2">{t("ebayslctd")}</div>
                    </div>
                  ) : values.platform == "shopify" ? (
                    <div className="m-auto px-5">
                      <div className=" font-weight-bold h6 mb-0">
                        {t("onwstore")}
                      </div>
                      <div className="panel-body px-2">{t("shopslctd")}</div>
                    </div>
                  ) : values.platform == "amazon" ? (
                    <div className="m-auto px-5">
                      <div className=" font-weight-bold h6 mb-0">
                        {t("mrktplc")}
                      </div>
                      <div className="panel-body px-2">{t("amzsltcd")}</div>
                      <i className="font-weight-bold">{t("amzsub")}</i>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mx-md-auto ml-auto mt-md-4 mb-2 text-md-center text-right w-100 next-fix">
                  <div className="text-danger small text-center d-md-none d-block">
                    {values.platform == "" ? t("platchck") : ""}
                  </div>
                  <button
                    onClick={Continue}
                    type="submit"
                    disabled={values.platform == ""}
                    className={`border-0 bg-trans mx-auto 
                    ${
                      values.platform !== ""
                        ? "d-blue"
                        : "btn-disbaled text-grey"
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <span className="font-weight-bold">{t("nxt")} </span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                    </div>
                  </button>
                  <div className="text-danger small text-center d-none d-md-block">
                    {values.platform == "" ? t("platchck") : ""}
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

export default PlatForm;
