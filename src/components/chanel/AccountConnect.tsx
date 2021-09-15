import React, { useState } from "react";
import { Container, Input, Radio } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import ProgressBar from "./ProgressBar";
import MbProgressBar from "./MbProgressBar";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";
import Previousstep from "../SmallComponents/Previousstep";
import ButttonCom from "./component/ButttonCom";
setTranslations({ en });
setDefaultLanguage("en");
function AccountConnect({
  nextStep,
  handleChangeApi,
  values,
  step,
  prevStep,
  platform,
  api,
  handleChangeExtension,
  extension,
}: any) {
  const [enable, setEnable] = useState(false);
  const Continue = (e: any) => {
    e.preventDefault();
    nextStep();
  };
  const Previous = (e: any) => {
    e.preventDefault();
    prevStep();
  };
  const t = useTranslation();
  console.log(enable, "value for extension");
  return (
    <Container component="main" maxWidth="lg">
      <div>
        <form>
          <div className="row mx-auto">
            <div className="col-12 my-2 d-block d-xl-none px-0">
              <MbProgressBar step={step} platform={platform} />
            </div>
            <div className="col-xl-8 shade-Channel mb-no-shade bg-white br-8 mt-3">
              <Previousstep Previous={Previous} />
              <div className="row mx-auto px-lg-5 px-md-3">
                <div className="text-center mx-auto col-md-12 px-0 px-md-2">
                  <h5 className="font-weight-bold mb-0">
                    {t("step4h")}
                    {platform == "ebay"
                      ? " Ebay "
                      : platform == "amazon"
                      ? " Amazon "
                      : " Shopify "}
                    {t("acnt")}?
                  </h5>
                </div>
                <div className="text-center col-12 col-md-10 mx-auto lh-1">
                  <i className="font-weight-bold">{t("changeset")}</i>
                </div>
                {platform == "ebay" ? (
                  <>
                    <div className="col-md-10 mx-auto px-md-3 px-0">
                      <label className=" mb-0">
                        <input
                          type="radio"
                          name="product"
                          className="card-input-element"
                          value={"api"}
                          checked={api == "easy"}
                          onChange={(e) => handleChangeApi("easy")}
                        />
                        <div
                          className={`panel panel-default  card-input shade-card br-8 my-1
                    ${api == "easy" ? "" : ""}
                    
                    `}
                        >
                          <div className="d-flex justify-content-between">
                            <div className=" font-weight-bold text-dark">
                              {t("wapi")}
                            </div>
                            <div className="text-success">{t("easy")}</div>
                          </div>
                          <div className="panel-body">
                            <div className="">{t("ebayapiconnect")}</div>
                            <div>- {t("easier")}</div>
                            <div>- {t("automated")}</div>
                            <div>- {t("support")}</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div className="col-md-10 mx-auto px-md-3 px-0">
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-element"
                      value={"api"}
                      checked={api == "advance"}
                      onChange={(e) => handleChangeApi("advance")}
                    />

                    <div
                      className={`panel panel-default  card-input shade-card br-8 my-1
                    ${api == "advance" ? "" : ""}
                    
                    `}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="font-weight-bold text-dark">
                          {t("napi")}
                        </div>
                        <div className="d-blue">
                          <i>{t("advnc")}</i>
                        </div>
                      </div>
                      <div className="panel-body">
                        <div className="mb-md-1">
                          {t("step4para1")}
                          {platform == "ebay"
                            ? " eBay’s "
                            : platform == "amazon"
                            ? " Amazon's "
                            : " Shopify's "}
                          {t("api")}
                        </div>
                        <div className="d-flex align-items-center">
                          <input
                            value={"ext"}
                            type="radio"
                            name="extension"
                            checked={extension == "computer"}
                            onChange={(e) => handleChangeExtension("computer")}
                            className="w-fit mr-2"
                          />
                          <span className="d-purple">{t("runext")}</span>
                        </div>
                        <div className="m-1 lh-1">
                          <i>
                            {t("oncomputer")}
                            {platform == "ebay"
                              ? " eBay "
                              : platform == "amazon"
                              ? " Amazon "
                              : " Shopify "}
                            {t("acnt")}.
                          </i>
                        </div>
                        <div className="d-flex align-items-center">
                          <input
                            value={"ext"}
                            type="radio"
                            name="extension"
                            checked={extension == "servers"}
                            className="w-fit mr-2"
                            onChange={(e) => handleChangeExtension("servers")}
                          />
                          <span className="d-purple">{t("extpkg")}</span>
                        </div>
                        <div className="m-1 lh-1">
                          <i>{t("keeppcon")}</i>
                        </div>
                        <div className="font-weight-bold">{t("whyext")}</div>
                        <div className="my-1">
                          {platform == "ebay"
                            ? " eBay "
                            : platform == "amazon"
                            ? " Amazon "
                            : " Shopify "}
                          {t("strictpara")}
                          <i className="purple ml-1">{t("seetut")} </i>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="mx-auto text-xl-center text-right text-md-center col-12 next-fix">
                  <div className="d-block d-md-none w-100 text-center">
                    <div
                      className={` mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                        values.api == "" ? "" : "d-none"
                      } `}
                    >
                      <i>{t("step4check")}</i>
                    </div>
                    <div
                      className={` mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                        values.api == "advance" && values.extension == ""
                          ? ""
                          : "d-none"
                      } `}
                    >
                      <i> {t("howextrun")}</i>
                    </div>
                  </div>
                  <ButttonCom title={"Next"} onClick={Continue} disabled={
                      values.api == "" ||
                      (values.api == "advance" && values.extension == "")
                    } />
                  {/* <button
                    onClick={Continue}
                    type="submit"
                    disabled={
                      values.api == "" ||
                      (values.api == "advance" && values.extension == "")
                    }
                    className={`border-0 bg-trans mx-auto ${
                      values.api == "" ||
                      (values.api == "advance" && values.extension == "")
                        ? "btn-disbaled text-grey"
                        : "d-blue"
                    } `}
                  >
                    <div className="d-flex align-items-center">
                      <span className="font-weight-bold">Next</span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                    </div>
                  </button> */}
                  <div className="d-md-block d-none w-100 text-center">
                    <div
                      className={`small mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                        values.api == "" ? "" : "d-none"
                      } `}
                    >
                      <i>{t("step4check")} </i>
                    </div>
                    <div
                      className={`small mx-auto text-center font-weight-bold mb-1 text-danger lh-1 ${
                        values.api == "advance" && values.extension == ""
                          ? ""
                          : "d-none"
                      } `}
                    >
                      <i>{t("howextrun")} </i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 d-xl-block d-none m-auto">
              <ProgressBar step={step} platform={platform} />
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default AccountConnect;
