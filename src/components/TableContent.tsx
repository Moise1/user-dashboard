import { Table } from "antd";
import React, { useState } from "react";
import img from "../assets/icon.png";
import doticon from "../assets/doticon.svg";
import editicon from "../assets/editicon.svg";
import SmallTabs from "./SmallComponents/SmallTabs";
import { columns } from "../data";
const data: any = [];
const windowwidth = window.innerWidth;

console.log(windowwidth);
for (let i = 0; i < 26; i++) {
  data.push({
    key: i,

    img: <img src={img} height={30} alt="" />,
    item: 1234546789,
    src: "Amazon",
    title: (
      <div className="w-title align-items-center my-auto ">
        {" "}
        <p className="mb-0">Title of the product</p>{" "}
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
    created: (
      <div>
        13/07/2021 12:56
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    ),
  });
}

function TableContent() {
  // Check here to configure the default column
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
    console.log(selectedRowKeys.length);
    const selected = selectedRowKeys.length;
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
          setSelectedRowKeys(newSelectedRowKeys);
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
          setSelectedRowKeys(newSelectedRowKeys);
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
                      windowwidth < 900 ? "" : "Listings"
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

export default TableContent;
