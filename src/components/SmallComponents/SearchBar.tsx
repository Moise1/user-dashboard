import React from "react";
import list_saerch from "../../assets/list_search.jpg";
import column_img from "../../assets/columnimg.svg";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import search_icon from "../../assets/search.svg";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
var everLoaded = false;
if (!everLoaded) {
  console.log('First time i ever loaded!')
  setTranslations({ en });
  setDefaultLanguage("en");
  everLoaded = true;
}


export default function SearchBar() {
  const t = useTranslation();
  return (
    <div className="row justify-content-between pl-3 py-lg-2">
      <div className="col-md-7 pl-lg-0 lh-1 px-0">
        <div className="input-group br-10 input-group-sm border  rounded px-3 bg-white z-0">
          <input
            type="text"
            className="form-control input-focus-none search_placeholder br-10 h-62 border-0"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder={t("search")}
          />
          <div className="input-group-prepend">
            <button
              className="input-group-text br-10 bg-white"
              id="inputGroup-sizing-sm"
            >
              <img src={search_icon} height="20" alt="" />
            </button>
          </div>
        </div>
        {/* <Search
          placeholder="Search..."
          className="border-0 rounded bg-white h-100"
          allowClear
          style={{ width: "90%" }}
        /> */}
      </div>
      <div className="col-md-5   my-md-0 lh-1  d-md-block d-none">
        <div className="d-flex w-100 justify-content-end ">
          <button className="btn  fs-18 fw-bold bg-c4c4c4  p-3  text-white border-0 br-8 advance-search-hover">
            <img
              src={list_saerch}
              className="invert mr-3 "
              height="26"
              alt=""
            />
            {t("AdvancedSearch")}
          </button>
          <button className="btn  ml-3 my-auto p-3  fs-18 fw-bold bg-purple text-white border-0 br-8 view-columns-hover">
            <img src={column_img} className="mr-3" height="25" alt="" />  {t("ViewColumns")}
          </button>
        </div>
      </div>
    </div>
  );
}
