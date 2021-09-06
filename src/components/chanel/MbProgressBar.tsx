import React from "react";
import progress_done from "../../assets/channel/greenbar.png";
import progress_remain from "../../assets/channel/greybar.png";

function MbProgressBar(props: any) {
  console.log(props.step, "this is step");
  return (
    <div className="row mx-auto tex-center m-auto">
      <div className="col px-1">
        <img className="w-100 h-15p" src={progress_done} alt="bar-icon" />
      </div>
      <div className="col px-1">
        <img
          className="w-100 h-15p"
          src={` ${props.step > 1 ? progress_done : progress_remain} `}
          alt="bar-icon"
        />
      </div>
      <div className="col px-1">
        <img
          className="w-100 h-15p"
          src={` ${props.step > 2 ? progress_done : progress_remain} `}
          alt="bar-icon"
        />
      </div>
      <div className="col px-1">
        <img
          className="w-100 h-15p"
          src={` ${props.step > 3 ? progress_done : progress_remain} `}
          alt="bar-icon"
        />
      </div>
      <div className="col px-1">
        <img
          className="w-100 h-15p"
          src={` ${props.step > 4 ? progress_done : progress_remain} `}
          alt="bar-icon"
        />
      </div>
      <div className="col px-1">
        <img
          className="w-100 h-15p"
          src={` ${props.step > 5 ? progress_done : progress_remain} `}
          alt="bar-icon"
        />
      </div>
    </div>
  );
}

export default MbProgressBar;
