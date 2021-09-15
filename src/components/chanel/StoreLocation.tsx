import React, { Props } from "react";
import { Container } from "@material-ui/core";

import aus_flag from "../../assets/channel/flags/AU.png";
import ger_flag from "../../assets/channel/flags/DE.png";
import sp_flag from "../../assets/channel/flags/ES.png";
import fr_flag from "../../assets/channel/flags/FR.png";
import it_flag from "../../assets/channel/flags/IT.png";
import uk_flag from "../../assets/channel/flags/UK.png";
import us_flag from "../../assets/channel/flags/US.png";
import back_icon from "../../assets/channel/flags/back.png";
import ProgressBar from "./ProgressBar";
import MbProgressBar from "./MbProgressBar";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";
import Previousstep from "../SmallComponents/Previousstep";
setTranslations({ en });
setDefaultLanguage("en");
function StoreLocation({
  nextStep,
  handleChangeLocation,
  values,
  platform,
  step,
  flag,
  prevStep,
}: any) {
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
              <MbProgressBar step={step} platform={platform} />
            </div>
            <div className="col-xl-8 shade-Channel mb-no-shade bg-white br-8 mt-2 pt-1">
              <Previousstep Previous={Previous} />
              <div className="row mx-auto px-lg-5 px-md-3 h-resp-65">
                <div className="text-center col-10 mt-2 mx-auto">
                  <h5 className="font-weight-bold">{t("bar2")}?</h5>
                </div>
                <div className="text-center col-12 col-md-10 mx-auto">
                  <h6 className="">
                    {platform == "ebay"
                      ? t("storebay")
                      : platform == "amazon"
                      ? t("storamz")
                      : t("storshp")}
                  </h6>
                </div>
                <div
                  className={`col-4 mb-2 ${
                    platform == "amazon" ? "d-none" : ""
                  }`}
                >
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-flag d-none"
                      value={"storelocation"}
                      onChange={(e) => handleChangeLocation("australia")}
                    />
                    <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
                      <img
                        src={aus_flag}
                        height="80"
                        width="80"
                        className={`  ${
                          values.storeLocation == "australia" ||
                          values.storeLocation == ""
                            ? ""
                            : "btn-disbaled"
                        }`}
                        alt="flag"
                      />
                    </div>
                    <div className="panel-body text-center">Australia</div>
                  </label>
                </div>
                <div
                  className={`col-4 mb-2 ${
                    platform == "amazon" ? "d-none" : ""
                  }`}
                >
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-flag d-none"
                      value={"storelocation"}
                      onChange={(e) => handleChangeLocation("germany")}
                    />
                    <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
                      <img
                        src={ger_flag}
                        height="80"
                        width="80"
                        className={`  ${
                          values.storeLocation == "germany" ||
                          values.storeLocation == ""
                            ? ""
                            : "btn-disbaled"
                        }`}
                        alt="flag"
                      />
                    </div>
                    <div className="panel-body text-center">Germany</div>
                  </label>
                </div>
                <div className="col-4 mb-2">
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-flag d-none"
                      value=""
                      onChange={(e) => handleChangeLocation("spain")}
                    />
                    <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
                      <img
                        src={sp_flag}
                        height="80"
                        width="80"
                        className={`  ${
                          values.storeLocation == "spain" ||
                          values.storeLocation == ""
                            ? ""
                            : "btn-disbaled"
                        }`}
                        alt="flag"
                      />
                    </div>
                    <div className="panel-body text-center">Spain</div>
                  </label>
                </div>
                <div
                  className={`col-4 mb-2 ${
                    platform == "amazon" ? "d-none" : ""
                  }`}
                >
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-flag d-none"
                      value=""
                      onChange={(e) => handleChangeLocation("france")}
                    />
                    <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
                      <img
                        src={fr_flag}
                        height="80"
                        width="80"
                        className={`  ${
                          values.storeLocation == "france" ||
                          values.storeLocation == ""
                            ? ""
                            : "btn-disbaled"
                        }`}
                        alt="flag"
                      />
                    </div>
                    <div className="panel-body text-center">France</div>
                  </label>
                </div>
                <div
                  className={`col-4 mb-2 ${
                    platform == "amazon" ? "d-none" : ""
                  }`}
                >
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-flag d-none"
                      value=""
                      onChange={(e) => handleChangeLocation("italy")}
                    />
                    <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
                      <img
                        src={it_flag}
                        height="80"
                        width="80"
                        className={`  ${
                          values.storeLocation == "italy" ||
                          values.storeLocation == ""
                            ? ""
                            : "btn-disbaled"
                        }`}
                        alt="flag"
                      />
                    </div>
                    <div className="panel-body text-center">Italy</div>
                  </label>
                </div>
                <div className="col-4 mb-2">
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-flag d-none"
                      value=""
                      onChange={(e) => handleChangeLocation("uk")}
                    />
                    <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
                      <img
                        src={uk_flag}
                        height="80"
                        width="80"
                        className={`  ${
                          values.storeLocation == "uk" ||
                          values.storeLocation == ""
                            ? ""
                            : "btn-disbaled"
                        }`}
                        alt="flag"
                      />
                    </div>
                    <div className="panel-body text-center">United Kingdom</div>
                  </label>
                </div>
                <div className="col-4 mb-2">
                  <label className="">
                    <input
                      type="radio"
                      name="product"
                      className="card-input-flag d-none"
                      value=""
                      onChange={(e) => handleChangeLocation("us")}
                    />
                    <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
                      <img
                        src={us_flag}
                        height="80"
                        width="80"
                        className={`  ${
                          values.storeLocation == "us" ||
                          values.storeLocation == ""
                            ? ""
                            : "btn-disbaled"
                        }`}
                        alt="flag"
                      />
                    </div>
                    <div className="panel-body text-center">
                      United States of America
                    </div>
                  </label>
                </div>
                <div className="col-12"></div>
                <div className="mx-md-auto ml-auto mt-md-4 text-right text-md-center w-100 next-fix">
                  <div className="text-danger w-100 text-center small d-block d-md-none">
                    {values.storeLocation == ""
                      ? "  *Please select a country in order to proceed"
                      : ""}
                  </div>
                  <button
                    onClick={Continue}
                    type="submit"
                    disabled={values.storeLocation == ""}
                    className={`border-0 bg-trans mx-auto 
                    ${
                      values.storeLocation !== ""
                        ? "d-blue"
                        : "btn-disbaled text-grey"
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <span className="font-weight-bold">{t("nxt")}</span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                    </div>
                  </button>
                  <div className="text-danger w-100 text-center mb-2 small d-md-block d-none">
                    {values.storeLocation == "" ? t("strchck") : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 d-xl-block d-none m-auto">
              <ProgressBar platform={platform} step={step} />
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default StoreLocation;
