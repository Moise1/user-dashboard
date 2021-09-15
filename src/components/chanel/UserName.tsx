import React from "react";
import { Container } from "@material-ui/core";
import Input from "@material-ui/core/Input";
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
function UserName({
  nextStep,
  handleChangeUser,
  values,
  step,
  prevStep,
  platform,
  user,
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
            <div className="col-lg-8 shade-Channel mb-no-shade bg-white br-8 mt-3">
              <Previousstep Previous={Previous} />
              <div className="row mx-auto px-lg-5 px-md-3 h-80vh">
                <div className="text-center mx-auto col-md-6 mt-2 px-0 px-md-2">
                  <h5 className="font-weight-bold mb-0">
                    {t("whatsur")}
                    {platform == "ebay"
                      ? " EBay "
                      : platform == "amazon"
                      ? " Amazon "
                      : " Shopify "}
                    {t("username")}?
                  </h5>
                </div>
                <div className="text-center col-12 col-md-8 mx-auto">
                  <div>
                    {t("makesure")}
                    {platform == "ebay"
                      ? " EBay "
                      : platform == "amazon"
                      ? " Amazon "
                      : " Shopify "}{" "}
                    <span className="font-weight-bold">{t("username")} </span>{" "}
                    {t("notur")}
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control bg-input-light mt-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={user}
                      placeholder={
                        platform == "ebay"
                          ? " EBay username"
                          : platform == "amazon"
                          ? " Amazon username"
                          : " Shopify username"
                      }
                      onChange={(e) => handleChangeUser(e.target.value)}
                    />
                    <div
                      className={`text-left font-weight-bold
                    ${values.user == "" ? "text-danger" : "d-none"}
                    `}
                    >
                      <i>
                        {t("fill")}
                        {platform == "ebay"
                          ? " EBay "
                          : platform == "amazon"
                          ? " Amazon "
                          : " Shopify "}{" "}
                        {t("username")}
                      </i>
                    </div>
                  </div>
                </div>
                <div className="mx-auto next-fix mt-auto pt-2 mb-3 text-md-center text-right w-100 align-items-end d-flex">
                  <button
                    onClick={Continue}
                    type="submit"
                    disabled={values.user == ""}
                    className={`border-0 bg-trans mx-md-auto ml-auto 
                    ${values.user == "" ? " text-grey btn-disbaled" : "d-blue"}
                    `}
                  >
                    <div className="d-flex align-items-center">
                      <span className="font-weight-bold">Next</span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-md-1"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-xl-block d-none m-auto">
              <ProgressBar step={step} platform={platform} />
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default UserName;
