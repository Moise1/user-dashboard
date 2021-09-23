import React, { useState } from 'react';
import { Table } from 'antd';
// import { useTranslation } from 'react-multi-lang';

import img from '../assets/icon.png';
import doticon from '../assets/doticon.svg';
import editicon from '../assets/editicon.svg';
import { columns } from '../data';
import PaginationTable from './PaginationTable';
import { TableRowSelection } from 'antd/lib/table/interface';

type dataKeyType = string | number;

interface iData {
  key: dataKeyType;
  img: JSX.Element;
  item: number;
  src: srcType;
  title: JSX.Element;
  sell: number;
  cost: number;
  profile: number;
  markup: JSX.Element;
  stock: JSX.Element;
  created: JSX.Element;
}

const data: iData[] = [];

for (let i = 0; i < 26; i++) {
  data.push({
    key: i,

    img: <img src={img} height={30} alt="" />,
    item: 1234546789,
    src: 'Amazon',
    title: (
      <div className="w-title align-items-center my-auto ">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
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
      <div className="d-flex justify-content-between">
        13/07/2021 12:56
        <img className="ml-4" src={editicon} />
        <img className="ml-3" src={doticon} />
      </div>
    )
  });
}

function TableContent() {
  // Check here to configure the default column
  const [selectedRowKeys, setSelectedRowKeys] = useState<dataKeyType[]>([]);

  const onSelectChange = (selectedRowKeys: dataKeyType | dataKeyType[], _selectedRows: iData[]) => {
    if (Array.isArray(selectedRowKeys)) {
      setSelectedRowKeys(selectedRowKeys);
      console.log(selectedRowKeys.length);
    } else {
      setSelectedRowKeys([selectedRowKeys]);
    }
  };
  const rowSelection: TableRowSelection<iData> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys: dataKeyType[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key: dataKeyType, index: number) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys: dataKeyType[]) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key: dataKeyType, index: number) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        }
      }
    ]
  };

  return (
    <React.Fragment>
      <div className="bg-white br-10">
        <div className="row mx-auto  align-items-center justify-content-between">
          {selectedRowKeys.length ? (
            <div className="col-lg-6 col-md-8 mb-3">
              <div className="d-flex justify-content-around mt-2 mr-3 bg-f2f8ff br-15 p-2">
                {selectedRowKeys.length ? (
                  <div className="listing-tabs d-flex align-items-center justify-content-center">
                    <button className="btn foucs-none py-1 ">
                      Edit <span>{selectedRowKeys.length}</span> Listings
                    </button>
                  </div>
                ) : (
                  ''
                )}
                <span className="border-left-tab"></span>
                {selectedRowKeys.length ? (
                  <div className="listing-tabs d-flex align-items-center justify-content-center">
                    <button className="btn foucs-none py-1">
                      Copy <span>{selectedRowKeys.length}</span> Listings
                    </button>
                  </div>
                ) : (
                  ''
                )}
                <span className="border-left-tab"></span>

                {selectedRowKeys.length ? (
                  <div className="listing-tabs d-flex align-items-center justify-content-center">
                    <button className="btn foucs-none py-1">
                      Optimize <span>{selectedRowKeys.length}</span> Listings
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
          {selectedRowKeys.length ? (
            <div className="col-auto">
              <span className="active-items-num d-inline-block pr-3">26 active</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />

        <PaginationTable />
      </div>
    </React.Fragment>
  );
}

export default TableContent;
