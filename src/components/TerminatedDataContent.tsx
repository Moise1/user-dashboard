import React, { useState } from 'react';

import { Table } from 'antd';
import img from '../assets/icon.png';
import { columns } from './SmallComponents/TerminatedData';

const windowwidth = window.innerWidth;
console.log(windowwidth);

interface iData {
  key: number;
  item: number;

  img: JSX.Element;
  title: JSX.Element;
  created: JSX.Element;
}

type dataKeyType = string | number;

const data: iData[] = [];

for (let i = 0; i < 26; i++) {
  data.push({
    key: i,
    img: <img src={img} height={30} alt="" />,
    item: 1234546789,
    created: <div className="fw-500 fs-18 c-262e80">13/07/2021 12:56</div>,
    title: (
      <div className="w-title align-items-center my-auto ">
        {' '}
        <p className="mb-0">Title of the product</p>{' '}
      </div>
    )
  });
}

function TerminatedDataContent() {
  // Check here to configure the default column
  const [selectedRowKeys, setSelectedRowKeys] = useState<dataKeyType[]>([]);

  const onSelectChange = (selectedRowKeys: dataKeyType[]) => {
    setSelectedRowKeys(selectedRowKeys);
    console.log(selectedRowKeys.length);
  };
  const rowSelection = {
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
      <div className="bg-white rounded">
        <div className="row mx-auto  align-items-center">
          {selectedRowKeys.length ? (
            <div className="col-lg-6 col-md-8 mr-3 bg-lighter br-15 p-2">
              <div className="row">
                {selectedRowKeys.length ? (
                  // <SmallTabs
                  //   title={`Edit ${selectedRowKeys.length} ${
                  //     windowwidth < 900 ? "" : "Listings"
                  //   } `}
                  //   last={false}
                  // />
                  <div className="listing-tabs">
                    Edit <span>{selectedRowKeys.length}</span> Listings
                  </div>
                ) : (
                  ''
                )}
                {selectedRowKeys.length ? (
                  // <SmallTabs
                  //   title={`Copy ${selectedRowKeys.length} ${
                  //     windowwidth < 900 ? "" : "Listings"
                  //   } `}
                  //   border={true}
                  //   last={false}
                  // />
                  <div className="listing-tabs">
                    Copy <span>{selectedRowKeys.length}</span> Listings
                  </div>
                ) : (
                  ''
                )}
                {selectedRowKeys.length ? (
                  // <SmallTabs
                  //   title={`Optimize ${selectedRowKeys.length} ${
                  //     windowwidth < 900 ? "" : "Listings"
                  //   } `}
                  //   last={false}
                  // />
                  <div className="listing-tabs">
                    Optimize <span>{selectedRowKeys.length}</span> Listings
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    </React.Fragment>
  );
}

export default TerminatedDataContent;
