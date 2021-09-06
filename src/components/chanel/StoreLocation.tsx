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
  return (
    <Container component="main" maxWidth="lg">
      <div>
        <form>
          <div className="row mx-auto">
            <div className="col-12 my-2 d-block d-xl-none px-0">
              <MbProgressBar step={step} platform={platform} />
            </div>
            <div className="col-xl-8 shade-Channel bg-white br-8 mt-2">
              <button
                onClick={Previous}
                type="submit"
                className="bg-trans border-0 text-left lh-1"
              >
                <img src={back_icon} height="30" alt="previous_icon" />
                <div className="d-purple font-weight-bold small d-xl-block d-none">
                  Previous step
                </div>
              </button>
              <div className="row mx-auto px-lg-5 px-md-3 h-100 h-resp-65">
                <div className="text-center col-10 mt-2 mx-auto">
                  <h5 className="font-weight-bold">
                    Where is your store based?
                  </h5>
                </div>
                <div className="text-center col-12 col-md-10 mx-auto">
                  <h6 className="">
                    {platform == "ebay"
                      ? "No worries! With the Ebay Global shipping program you will be able to sell everywhere, we need to know the country your Ebay account is registered in."
                      : platform == "amazon"
                      ? "No worries! You can request to sell in other countries, we need to know the one your account is registered in."
                      : "No worries! you can create different stores linked to different countries. We need to manage them separately as some suppliers have different prices and shipping times for each country."}
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
                <div className="text-danger w-100 text-center small d-block d-md-none">
                  {values.storeLocation == ""
                    ? "  *Please select a country in order to proceed"
                    : ""}
                </div>
                <div className="mx-md-auto ml-auto mt-md-4 text-center">
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
                      <span className="font-weight-bold">Next</span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                    </div>
                  </button>
                </div>
                <div className="text-danger w-100 text-center mb-2 small d-md-block d-none">
                  {values.storeLocation == ""
                    ? "  *Please select a country in order to proceed"
                    : ""}
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
