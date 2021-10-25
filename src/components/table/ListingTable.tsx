//import tableimg from '../../assets/table-image.png';
// import tickimg from '../assets/tableImg/tick.svg';
// import editimg from '../assets/tableImg/editicon.svg';
// import dotsicon from '../assets/tableImg/dotsicon.svg';
import { useState } from 'react';
import { ListingTableRow } from './ListingTableRow';
import { t } from '../../global/transShim';

export interface rowData {
  id: number;
  selectall: string;
  itemNo: string;
  source: srcType;
  title: string;
  sell: currency;
  cost: currency;
  profit: number;
  markup: percent;
  stock: number;
  createdOn: Date | string;
}

const tabledata: rowData[] = [...Array(10).keys()].map((id) => {
  return {
    id: id,
    selectall: `https://picsum.photos/seed/${id + 1}/33/33`, // tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: Math.round((Math.random() * 1000000 + 1000) / 100) / 100,
    cost: Math.round((Math.random() * 1000000 + 1000) / 100) / 100,
    profit: Math.round((Math.random() * 1000000 + 1000) / 100) / 100,
    markup: '30%',
    stock: 2,
    createdOn: new Date(Math.random() * 100000000000 + 1500000000000)
  };
});

export default function ListingTable() {
  const [showActive, setShowActive] = useState(true);
  return (
    <>
      <div className="bg-white br-10">
        {showActive ? (
          ''
        ) : (
          <div className="d-flex justify-content-between">
            <div className="pt-3">
              <span className="py-1 px-2 p-sm-2 ml-sm-4 mx-2 mx-sm-0 bg-f2f8ff br-15 box-width  ">
                <span className="check-click-text  pr-3 listing-table-border">
                  Edit <span className="fw-600">5</span> Listings
                </span>
                <span className="check-click-text  pr-3 listing-table-border mx-3">
                  {' '}
                  Copy <span className="fw-600">5</span> listings{' '}
                </span>
                <span className="check-click-text">
                  Optimise <span className="fw-600">5</span> titles
                </span>
              </span>
            </div>

            <div className="py-3 pr-1 pr-md-3">
              {' '}
              <p className="active-text-black">26 active</p>
            </div>
          </div>
        )}
        <div className="overflow-x-auto pt-4">
          <div className="d-flex table-head border-bottom-body ml-3 table-header listingTableRow">
            <div className="d-flex align-items-center">
              {/* <input
                onClick={() => {
                  setShowActive(!showActive);
                }}
                type="checkbox"
                id="select-all"
              />

              <label className="d-none d-md-block" htmlFor="select-all">
                Select all
              </label> */}

              <label className="select-all-checkbox">
                <input
                  onClick={() => {
                    setShowActive(!showActive);
                  }}
                  type="checkbox"
                />
                <span className="checkmark"></span>
              </label>
              <span className="select-all-label-text-listing d-none d-lg-block"> Select all</span>
            </div>

            <div>{t('Listings.Column.Item no.')}</div>
            <div className="d-none d-md-block">{t('Listings.Column.Source')}</div>
            <div>{t('Listings.Column.Title')}</div>
            <div className="d-none d-md-block">{t('Listings.Column.Sell')}</div>
            <div className="d-none d-md-block">{t('Listings.Column.Cost')}</div>
            <div>{t('Listings.Column.Profit')}</div>
            <div className="d-none d-md-block">{t('Listings.Column.Markup')}</div>
            <div>{t('Listings.Column.Stock')}</div>
            <div className="">{t('Listings.Column.Created on')}</div>
            <div>&nbsp;</div>
          </div>
          <div className="table-body ml-3">
            {tabledata.map((key) => (
              <ListingTableRow key={key.id} data={key} />
            ))}
          </div>
        </div>
        <div className="d-flex  mx-4  justify-content-between align-items-start align-items-sm-center py-3">
          <div className="d-flex align-items-center ">
            <p className="table-body-sell listing-table-border w-50px pr-3 mb-0">50</p>
            <p className="table-body-sell listing-table-border w-50px px-3 mb-0">100</p>
            <p className="table-body-sell w-50px pl-3 mb-0">500</p>
          </div>
          <p className="mb-0">
            <span className="pagination-number w-50px px-2">1</span>
            <span className="pagination-number w-50px px-2">2</span>
            <span className="pagination-number w-50px px-2">3</span>
            <span className="pagination-number w-50px pl-2">4</span>
            <span className="pagination-number w-50px ">...</span>
            <span className="pagination-number w-50px px-2">5</span>
          </p>
        </div>
      </div>
    </>
  );
}
