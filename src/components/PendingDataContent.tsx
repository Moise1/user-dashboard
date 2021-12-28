import React, { useState } from 'react';

import { Table } from 'antd';
import img from '../assets/icon.png';
import { columns } from './small-components/PendindData';

interface iData {
  key: number;
  item: number;
  src: srcType;

  img: JSX.Element;
  title: JSX.Element;
  status: JSX.Element;
  created: JSX.Element;
  createdBy: JSX.Element;
}

type dataKeyType = string | number;

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

    status: <div style={{ color: '#7d7d7d' }}>Listing on Amazon</div>,
    created: <div>13/07/2021 12:56</div>,
    createdBy: <div style={{ color: '#262e80' }}>Nametest</div>
  });
}

function PendingDataContent() {
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
      <div className="bg-white br-10">
        <div className="row mx-auto  align-items-center">
          {selectedRowKeys.length && (
            <div className="col-lg-6 col-md-8 mr-3 bg-lighter p-2">
              <div className="row justify-content-around mt-2">
                {selectedRowKeys.length ? (
                  <div className="listing-tabs">
                    <button className="btn">
                      Edit <span>{selectedRowKeys.length}</span> Listings
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {selectedRowKeys.length ? (
                  <div className="listing-tabs">
                    <button className="btn">
                      Copy <span>{selectedRowKeys.length}</span> Listings
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {selectedRowKeys.length ? (
                  <div className="listing-tabs">
                    <button className="btn">
                      Optimize <span>{selectedRowKeys.length}</span> Listings
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          )}
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
    </React.Fragment>
  );
}

export default PendingDataContent;
