import React from "react";
import list_saerch from "../../assets/list_search.jpg";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import search_icon from "../../assets/search.svg";
import {
  setTranslations,
  setDefaultLanguage,
  useTranslation,
} from "react-multi-lang";
import en from "../../translation.json";
setTranslations({ en });
setDefaultLanguage("en");
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const onSearch = () => console.log();
export default function SearchBar() {
  const t = useTranslation();
  return (
    <div className="row mx-auto py-lg-3 mt-md-3 mt-lg-1">
      <div className="col-md-5 pl-lg-0 lh-1 px-0">
        <div className="input-group input-group-sm border py-1 rounded pr-1 bg-white">
          <input
            type="text"
            className="form-control border-0"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder={t("search")}
          />
          <div className="input-group-prepend">
            <button
              className="input-group-text bg-white"
              id="inputGroup-sizing-sm"
            >
              <img src={search_icon} height="15" alt="" />
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
      <div className="col-md-3 my-md-0 lh-1 pl-2 d-md-block d-none">
        <button className="btn px-lg-5 px-2 bg-purple text-white border-0 br-8 h-100">
          <img src={list_saerch} className="invert" height="20" alt="" />{" "}
          {t("advsearch")}
        </button>
      </div>
    </div>
  );
}
