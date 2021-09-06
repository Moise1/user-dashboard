import React, { useState } from "react";
import { Container } from "@material-ui/core";

import ebay_logo from "../../assets/channel/ebay.png";
import shopify_logo from "../../assets/channel/shopify-2.png";
import amazon_logo from "../../assets/channel/amazon-2.png";
import ProgressBar from "./ProgressBar";
import MbProgressBar from "./MbProgressBar";
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
  return (
    <Container component="main" maxWidth="lg">
      <div>
        <form>
          <div className="row mx-auto">
            <div className="col-12 my-2 d-block d-xl-none px-0">
              <MbProgressBar step={step} />
            </div>
            <div className="col-xl-8 mt-2 pt-1 shade-Channel bg-white br-8">
              <div className="row mx-auto px-lg-4 px-md-3">
                <div className="text-center col-12">
                  <h5 className="font-weight-bold mb-0">
                    Where would you like to sell
                  </h5>
                </div>
                <div className="col-md-6 col-4 mt-md-3 px-0 px-md-2">
                  <label className="h-md-100">
                    <input
                      type="radio"
                      name="product"
                      value={"platform"}
                      className="card-input-element"
                      onChange={(e) => handleChangePlatform("ebay")}
                    />
                    <div
                      className={`panel panel-default panel-platform card-input shade-card br-8 h-100
                    ${platform == "ebay" ? " border border-primary" : ""}
                    
                    `}
                    >
                      <div className="mt-md-2 mb-md-5 mb-md-2">
                        <img
                          src={ebay_logo}
                          className="w-res-100"
                          alt="ebay logo"
                        />
                      </div>
                      <div className="d-md-block d-none">
                        <div className=" font-weight-bold">Marketplace</div>
                        <div className="panel-body">
                          It lets you sell products from any category. Update
                          your listing information and sell anything you wish.
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-6 col-4 mt-md-3 px-0 px-md-2">
                  <label className="h-100">
                    <input
                      type="radio"
                      name="product"
                      value={"platform"}
                      className="card-input-element"
                      onChange={(e) => handleChangePlatform("amazon")}
                    />
                    <div
                      className={`panel panel-default panel-platform card-input shade-card br-8 h-100
                    ${platform == "amazon" ? " border border-primary" : ""}
                    
                    `}
                    >
                      <div className="mt-md-2 mb-md-4 mb-md-5">
                        <img
                          src={amazon_logo}
                          className="w-res-100"
                          alt="ebay logo"
                        />
                      </div>
                      <div className="d-md-block d-none">
                        <div className=" font-weight-bold">Marketplace</div>
                        <div className="panel-body">
                          It gives your products great exposure due to the high
                          number of visitors. Optimise your titles and item
                          information to increase sells.
                        </div>
                        <div>
                          {values.platform ? (
                            <i className="font-weight-bold">
                              *you need to be self-employed to sell on Amazon.
                            </i>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="col-md-12 col-4 mt-md-3 px-0 px-md-3">
                  <label className="h-md-100">
                    <input
                      type="radio"
                      name="product"
                      value={"platform"}
                      className="card-input-element"
                      onChange={(e) => handleChangePlatform("shopify")}
                    />
                    <div
                      className={`panel panel-default panel-platform card-input shade-card br-8 h-100
                    ${platform == "shopify" ? " border border-primary" : ""}
                    
                    `}
                    >
                      <div className="mt-md-2 mb-md-5 mb-md-2">
                        <img
                          src={shopify_logo}
                          className="w-res-100"
                          alt="ebay logo"
                        />
                      </div>
                      <div className="d-md-block d-none">
                        <div className=" font-weight-bold">Your own store</div>
                        <div className="panel-body">
                          It provides a range of e-commerce tools to help you
                          build and promote your store.
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="row d-flex d-md-none mt-2 text-center h-resp-65">
                  {values.platform == "ebay" ? (
                    <div className="m-auto px-5">
                      <div className=" font-weight-bold h6 mb-0">
                        Marketplace
                      </div>
                      <div className="panel-body px-2">
                        It lets you sell products from any category. Update your
                        listing information and sell anything you wish.
                      </div>
                    </div>
                  ) : values.platform == "shopify" ? (
                    <div className="m-auto px-5">
                      <div className=" font-weight-bold h6 mb-0">
                        Your own store
                      </div>
                      <div className="panel-body px-2">
                        It provides a range of e-commerce tools to help you
                        build and promote your store.
                      </div>
                    </div>
                  ) : (
                    <div className="m-auto px-5">
                      <div className=" font-weight-bold h6 mb-0">
                        Marketplace
                      </div>
                      <div className="panel-body px-2">
                        It gives your products great exposure due to the high
                        number of visitors. Optimise your titles and item
                        information to increase sells.
                      </div>
                      <i className="font-weight-bold">
                        *you need to be self-employed to sell on Amazon.
                      </i>
                    </div>
                  )}
                </div>
                <div className="mx-md-auto ml-auto mt-md-4 mb-2 text-md-center text-right">
                  <div className="text-danger small text-center">
                    {values.platform == ""
                      ? "*Please select a platform on which you’d like to sell in order to proceed."
                      : ""}
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
                      <span className="font-weight-bold">Next</span>
                      <i className="fas fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                    </div>
                  </button>
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
