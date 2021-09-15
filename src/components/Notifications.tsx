import React from "react";
import ring_icon from "../assets/notification.svg";
import flag from "../assets/flag-round-500.svg";
import amazon from "../assets/amazon-icon-1.svg";
import { Dropdown, Button, Space } from "antd";
import DropDownMenu from "./SmallComponents/DropDownMenu";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../translation.json";
setTranslations({ en });
setDefaultLanguage("en");
export default function Notifications(props: any) {
  const t = useTranslation();
  return (
    <div className="row mx-auto pt-4 align-items-center">
      <h5 className="mb-0 d-blue font-weight-bold d-none d-md-block">
        {props.title}
      </h5>
      <div className="col-lg-5 col-md-8 ml-auto px-0 bg-white rounded mt-2 mt-lg-0">
        <div className="d-flex align-items-center p-lg-2 p-1 w-100">
          <img src={ring_icon} height="20" className="" alt="" />
          <div className="mx-2 mr-mg-3 d-blue lh-1">
            {" "}
            <span className="font-weight-bold">2</span>
            <span className="d-none d-md-inline pl-1"> {t("noti")} </span>
          </div>
          <div className="d-blue mr-2 mr-md-3 lh-1">
            <i className="fas fa-circle yellow"></i>
            <span className="font-weight-bold"> 12</span>
            <span className="d-none d-md-inline pl-1">{t("token")} </span>
          </div>
          <div className="d-blue mr-3 lh-1 font-weight-bold">{t("lnkst")} </div>
          <img src={flag} className="mx-2 lh-1" height="20" alt="" />
          <img src={amazon} className="mx-2 lh-1" height="20" alt="" />
          <div className="ml-auto">
            <Space direction="vertical">
              <Space wrap>
                <Dropdown overlay={<DropDownMenu />} placement="bottomLeft">
                  <Button>
                    <i className="fas fa-ellipsis-v"></i>
                  </Button>
                </Dropdown>
              </Space>
            </Space>
          </div>
        </div>
      </div>
      <h5 className="mb-0 d-blue font-weight-bold d-md-none mt-3 d-block">
        {props.title}
      </h5>
    </div>
  );
}
