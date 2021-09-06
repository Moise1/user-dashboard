import React from "react";
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
function Account({
  nextStep,
  handleChange,
  values,
  step,
  flag,
  prevStep,
  platform,
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
              <MbProgressBar platform={platform} step={step} />
            </div>
            <div className="col-xl-8 shade-Channel bg-white br-8 mt-2">
              <button
                onClick={Previous}
                type="submit"
                className="bg-trans border-0 text-left lh-1"
              >
                <img src={back_icon} height="30" alt="previous_icon" />
                <div className="d-purple font-weight-bold small d-md-block d-none">
                  Previous step
                </div>
              </button>
              <div className="row mx-auto px-lg-5 px-md-3">
                <div className="text-center mx-auto col-10 mt-2">
                  <h5 className="font-weight-bold">
                    {platform == "ebay"
                      ? " Do you have an eBay account?"
                      : platform == "amazon"
                      ? "Are you an Amazon seller?"
                      : "Do you have a Shopify store?"}
                  </h5>
                  {platform == "amazon" ? (
                    <i>
                      * You need to have the Amazon Business seller program, not
                      just sell on Amazon.
                    </i>
                  ) : (
                    ""
                  )}
                </div>
                <div className="text-left col-12 col-md-10 mx-auto">
                  {/* {platform !== "shopify" ? (
                    ""
                  ) : (
                    <div className="w-100 text-center">
                      <button className="h6 my-3 bg-d-purple br-8 text-white btn py-2 px-3 mx-auto">
                        Yes, I’m a seller on Shopify
                      </button>
                    </div>
                  )} */}
                  <h6 className="font-weight-bold w-100">
                    {platform == "ebay"
                      ? " No eBay account? We will happily show you How to get started!"
                      : platform == "amazon"
                      ? "No Amazon seller yet? We will happily show you how to get started!"
                      : "No Shopify store yet? We will happily show you how to get started!"}
                  </h6>
                </div>
                <div className="text-left col-12 col-md-10 mx-auto">
                  <div className="">
                    {platform == "ebay" ? (
                      " Before you start selling, you’ll need an eBay account. If you don’t already have one, you’ll need to register. You can choose between a personal or business account."
                    ) : platform == "amazon" ? (
                      "What is the Amazon Business seller program? The Amazon Business seller program is a free upgrade to the Professional Selling plan allowing sellers to cater to the specific requirements of business customers by providing features optimized for business-to-business transactions"
                    ) : (
                      <>
                        Navigate to the{" "}
                        <span className="sky">Shopify website</span> and click
                        on Start free trial. Fill in your desired email address,
                        password and store name.
                        <span className="mt-3"></span>
                        Remember, you’re going to need to choose a unique name
                        for your store, otherwise Shopify won’t allow you to
                        purchase the domain.
                      </>
                    )}
                  </div>
                </div>
                <div className="text-left col-12 col-md-10 mx-auto my-2">
                  <div className="">
                    {platform == "ebay" ? (
                      <>
                        If you plan to sell casually, like selling items you no
                        longer need or want, a personal account is the best
                        option. Pick a business account if you want to sell
                        large quantities, or have items that you’ve made or
                        bought to resell.
                      </>
                    ) : platform == "shopify" ? (
                      "To get started, we set up a dedicated page that will show you all you need to Know in order to set up the Shopify account and store."
                    ) : (
                      "To get started, we set up a dedicated page that will show you all you need to Know in order to set up the Amazon account and the business seller program."
                    )}
                  </div>
                </div>
                <div className="text-left col-12 col-md-10 mx-auto">
                  <div className="">
                    {platform == "ebay" ? (
                      <>
                        To get started, we set up a dedicated page that will
                        show you all you need to Know in order to set up the
                        Amazon account and the business seller program.
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="text-left col-12 col-md-10 mx-auto">
                  <a>
                    <div className="d-flex align-items-center d-blue">
                      <span className="font-weight-bold">
                        How to become an
                        {platform == "ebay"
                          ? " eBay "
                          : platform == "amazon"
                          ? " Amazon "
                          : " Shopify "}
                        seller
                      </span>
                    </div>
                  </a>
                </div>
                <div className="border-bottom mt-2 mb-lg-5  col-11 col-md-9 mx-auto"></div>
                <div className="mx-md-auto ml-auto mt-5 pt-lg-5 mb-2 text-center">
                  <button
                    onClick={Continue}
                    type="submit"
                    className="border-0 d-blue bg-trans mx-auto"
                  >
                    <div className="d-flex align-items-center">
                      <span className="font-weight-bold">
                        {platform == "ebay"
                          ? " Yes, I do have an eBay account "
                          : platform == "amazon"
                          ? " Yes I’m a seller on Amazon "
                          : " How to become an Shopify seller "}
                      </span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                    </div>
                  </button>
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

export default Account;
