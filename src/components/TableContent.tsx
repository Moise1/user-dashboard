import { Table } from "antd";
import React from "react";
import img from "../assets/icon.png";
import SmallTabs from "./SmallComponents/SmallTabs";
import { columns } from "../data";
import type { t } from "react-multi-lang";
import {
  setTranslations,
  setDefaultLanguage,
  withTranslation,
} from "react-multi-lang";
import en from "../translation.json";
setTranslations({ en });
setDefaultLanguage("en");
const data: any = [];

const windowwidth = window.innerWidth;
type Props = {
  t: t;
};

console.log(windowwidth);
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    img: <img src={img} height={30} alt="" />,
    // item: 1234546789,
    src: "Amazon",
    title: (
      <div className="w-title">
        {" "}
        <u>
          Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesua
          ff
        </u>{" "}
      </div>
    ),
    sell: 30.4,
    cost: 34.44,
    profile: 309,
    markup: <div className="pl-2">30%</div>,
    stock: (
      <div className="pl-1">
        <i className="d-green far fa-check-circle"></i> 2
      </div>
    ),
  });
}

class TableContent extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };
  onSelectChange = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys });
    console.log(selectedRowKeys.length);
    const selected = selectedRowKeys.length;
  };
  render() {
    const { t } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        Table.SELECTION_NONE,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys: any) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter(
              (key: any, index: any) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              }
            );
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys: any) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter(
              (key: any, index: any) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              }
            );
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <React.Fragment>
        <div className="bg-white rounded">
          <div className="row mx-auto p-1 align-items-center">
            {selectedRowKeys.length ? (
              <div className="col-lg-6 col-md-8 mr-3 bg-lighter br-15 p-2">
                <div className="row d-blue">
                  {selectedRowKeys.length ? (
                    <SmallTabs
                      title={`Edit ${selectedRowKeys.length} ${
                        windowwidth < 900 ? "" : t("acnt")
                      } `}
                      last={false}
                    />
                  ) : (
                    ""
                  )}
                  {selectedRowKeys.length ? (
                    <SmallTabs
                      title={`Copy ${selectedRowKeys.length} ${
                        windowwidth < 900 ? "" : "Listings"
                      } `}
                      border={true}
                      last={false}
                    />
                  ) : (
                    ""
                  )}
                  {selectedRowKeys.length ? (
                    <SmallTabs
                      title={`Optimize ${selectedRowKeys.length} ${
                        windowwidth < 900 ? "" : "Listings"
                      } `}
                      last={false}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withTranslation(TableContent);
