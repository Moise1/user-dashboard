import React from "react";
import progress_done from "../../assets/channel/progress.png";
import progress_remain from "../../assets/channel/progress_remain.png";
import progress_remain_dots from "../../assets/channel/progress_remain_dots.png";
import progress_done_dots from "../../assets/channel/progress_done_dots.png";
function ProgressBar(props: any) {
  console.log(props.platform, "sidebar");
  return (
    <div className="row mx-auto tex-center">
      <div className="col-10 mx-auto">
        <div className="d-flex align-items-center">
          <img height="30" src={progress_done} alt="progress" />{" "}
          <div
            className={` ${
              props.step > 1 ? "text-success" : ""
            } font-weight-bold m-auto`}
          >
            Select where you’re selling from
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img
          src={` ${
            props.step > 1 ? progress_done_dots : progress_remain_dots
          } `}
          alt=""
        />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img
            height="30"
            src={` ${props.step > 1 ? progress_done : progress_remain} `}
            alt="progress"
          />{" "}
          <div
            className={` ${
              props.step > 2 ? "text-success" : ""
            } font-weight-bold m-auto`}
          >
            Where is your store based
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img
          src={` ${
            props.step > 2 ? progress_done_dots : progress_remain_dots
          } `}
          alt=""
        />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img
            height="30"
            src={` ${props.step > 2 ? progress_done : progress_remain} `}
            alt="progress"
          />{" "}
          <div
            className={` ${
              props.step > 3 ? "text-success" : ""
            } font-weight-bold m-auto`}
          >
            {props.platform == "ebay"
              ? " Ebay "
              : props.platform == "amazon"
              ? " Amazon "
              : " Shopify "}
            account
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img
          src={` ${
            props.step > 3 ? progress_done_dots : progress_remain_dots
          } `}
          alt=""
        />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img
            height="30"
            src={` ${props.step > 3 ? progress_done : progress_remain} `}
            alt="progress"
          />
          <div
            className={` ${
              props.step > 4 ? "text-success" : ""
            } font-weight-bold m-auto`}
          >
            HGR account connection
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img
          src={` ${
            props.step > 4 ? progress_done_dots : progress_remain_dots
          } `}
          alt=""
        />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img
            height="30"
            src={` ${props.step > 4 ? progress_done : progress_remain} `}
            alt="progress"
          />

          <div
            className={` ${
              props.step > 5 ? "text-success" : ""
            } font-weight-bold m-auto`}
          >
            Link{" "}
            {props.platform == "ebay"
              ? " Ebay "
              : props.platform == "amazon"
              ? " Amazon "
              : " Shopify "}{" "}
            account
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto text-center my-2">
        <img
          src={` ${
            props.step > 5 ? progress_done_dots : progress_remain_dots
          } `}
          alt=""
        />
      </div>
      <div className="col-10 mx-auto text-left">
        <div className="d-flex align-items-center">
          <img
            height="30"
            src={` ${props.step > 5 ? progress_done : progress_remain} `}
            alt="progress"
          />{" "}
          <div
            className={` ${
              props.step > 6 ? "text-success" : ""
            } font-weight-bold m-auto`}
          >
            Listing options
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
