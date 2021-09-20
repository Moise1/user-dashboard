import { Menu, Button } from "antd";
import { Progress } from "antd";
import { useTranslation } from "react-multi-lang";
import HeaderDropDownItem from "../SmallComponents/HeaderDropDownItem";
import plus from "../../assets/plus.svg";
import { Link, NavLink } from "react-router-dom";
import search_icon from "../../assets/search.svg";
export default function DropDownMenu() {
  const t = useTranslation();
  return (
    <Menu className="drop-down_effect nav-dropdown">
      <div className="drop-down">
        <div className="row mx-auto my-2 align-items-center">
          <div className="col-12">
            {/* <Progress
              percent={40}
              showInfo={false}
              strokeColor={{
                "0%": "#87d068",
                "100%": "#87d068",
              }}
            /> */}

            <div className="input-group drop-search-input  br-10 my-2 input-group-sm border  rounded pr-1 bg-white">
              <input
                type="text"
                className="form-control input-focus-none search_placeholder br-10  border-0"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
                placeholder="Search..."
              />
              <div className="input-group-prepend">
                <button
                  className="input-group-text br-10 bg-white"
                  id="inputGroup-sizing-sm"
                >
                  <img src={search_icon} height="15" alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            {/* <div className="d-flex my-1">
              <span className="d-blue small mb-3 mt-2">Quota:45%(12/30)</span>
              <span className="text-success ml-auto small">Upgrade</span>
            </div> */}
          </div>
          <HeaderDropDownItem />
          <HeaderDropDownItem />
          <HeaderDropDownItem />

          <div className="col-md-12">
            <p className="fw-700">...</p>
          </div>
          <div className="col-md-12 mb-2 pl-2">
            <Link to="/newchannel">
              <div className="add-new-channel-drop">
                <p className="mb-0">Add new channel</p>
                <svg
                  id="Group_78"
                  data-name="Group 78"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.903"
                  height="16.903"
                  viewBox="0 0 16.903 16.903"
                >
                  <path
                    id="Path_65"
                    data-name="Path 65"
                    d="M0,0H16.9V16.9H0Z"
                    fill="none"
                  />
                  <ellipse
                    id="Ellipse_33"
                    data-name="Ellipse 33"
                    cx="6.99"
                    cy="6.99"
                    rx="6.99"
                    ry="6.99"
                    transform="translate(1.434 1.036)"
                    fill="none"
                    stroke="#535353"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <line
                    id="Line_35"
                    data-name="Line 35"
                    x2="6.99"
                    transform="translate(4.93 8.027)"
                    fill="none"
                    stroke="#535353"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                  <line
                    id="Line_36"
                    data-name="Line 36"
                    y2="6.99"
                    transform="translate(8.425 4.532)"
                    fill="none"
                    stroke="#535353"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* <Menu.Item className="p-0 bg-trans">
        <div className="d-flex py-2 pr-2 pr-lg-4 mx-auto text-right text-danger align-items-center small">
          <i className="fas fa-sign-out-alt pr-1 ml-auto"></i> {t("lgout")}
        </div>
      </Menu.Item> */}
    </Menu>
  );
}
