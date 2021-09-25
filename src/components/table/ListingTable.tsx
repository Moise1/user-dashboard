import tableimg from '../../assets/table-image.png';
// import tickimg from '../assets/tableImg/tick.svg';
// import editimg from '../assets/tableImg/editicon.svg';
// import dotsicon from '../assets/tableImg/dotsicon.svg';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { TickIcon, DotIcon, EditIcon } from '../../components/common/Icons';

const tabledata = [
  {
    id: 1,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 2,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 3,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 4,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 5,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 6,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 6,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 8,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 9,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  },
  {
    id: 10,
    selectall: tableimg,
    itemNo: '1234567',
    source: 'Amazon',
    title: 'Title of the product',
    sell: 30.67,
    cost: 23.59,
    profit: 3.09,
    markup: '30%',
    stock: '2',
    createdOn: '13/07/2021 12:56'
  }
];
export default function ListingTable() {
  const [showActive, setShowActive] = useState(true);
  return (
    <>
      <div className="bg-white br-10">
        {showActive ? (
          ''
        ) : (
          <div className="pt-3">
            <span className="p-2 ml-sm-4 mx-2 mx-sm-0 bg-f2f8ff br-15 box-width  ">
              <span className="check-click-text  pr-3 border-left-dark-voilet">
                Edit <span className="fw-600">5</span> listings
              </span>
              <span className="check-click-text  pr-3 border-left-dark-voilet mx-3">
                {' '}
                Copy <span className="fw-600">5</span> listings{' '}
              </span>
              <span className="check-click-text">
                Optimse <span className="fw-600">5</span> titles
              </span>
            </span>
          </div>
        )}
        <div className="overflow-x-auto pt-4">
          <div className="d-flex table-head border-bottom-body ml-4 ">
            <div className="min-width-170 d-flex">
              <Form.Group className="select-custom" controlId="formBasicCheckbox">
                <Form.Check
                  onClick={() => {
                    setShowActive(!showActive);
                  }}
                  type="checkbox"
                  label="Select all"
                />
              </Form.Group>
              {/* <div className="input-blue-check">
                <input
                  type="checkbox"
                  id="select-all-check"
                  name="fruit-4"
                  value="Select all"
                  onClick={() => {
                    setShowActive(!showActive);
                  }}
                />
                <label htmlFor="select-all-check">Select ally</label>
              </div> */}
            </div>
            <div className="min-width-170">
              <p className="table-head">Item no.</p>
            </div>
            <div className="min-width-170">
              <p className="table-head"> Source</p>
            </div>
            <div className="min-width-230">
              <p className="table-head">Title</p>
            </div>
            <div className="min-width-150">
              {' '}
              <p className="table-head">Sell</p>
            </div>
            <div className="min-width-150">
              <p className="table-head">Cost</p>
            </div>
            <div className="min-width-150">
              <p className="table-head">Profit</p>
            </div>
            <div className="min-width-150">
              <p className="table-head">Markup</p>
            </div>
            <div className="min-width-150">
              <p className="table-head">Stock</p>
            </div>
            <div className="min-width-250">
              <p className="table-head">Created on</p>
            </div>
          </div>
          <div className="table-body ml-4 d-flex">
            <div className="">
              {tabledata.map((key) => {
                return (
                  <>
                    <div className="d-flex border-bottom-body my-3 ">
                      <div className="min-width-170 d-flex">
                        <div className="form-group form-check">
                          <input type="checkbox" className="form-check-input mt-2" id="exampleCheck1" />
                          <label key={key.id} htmlFor="exampleCheck1" className="form-check-label ml-4 ">
                            <img src={key.selectall} alt="" />
                          </label>
                        </div>
                      </div>
                      <div className="min-width-170">
                        <p className="table-body-style">{key.itemNo}</p>
                      </div>
                      <div className="min-width-170">
                        <p className="table-body-style">{key.source}</p>
                      </div>
                      <div className="min-width-230">
                        <p className="table-body-title">{key.title}</p>
                      </div>
                      <div className="min-width-150">
                        <p className="table-body-sell">{key.sell}</p>
                      </div>
                      <div className="min-width-150">
                        <p className="table-body-sell">{key.cost}</p>
                      </div>
                      <div className="min-width-150">
                        <p className="table-body-profit">{key.profit}</p>
                      </div>
                      <div className="min-width-150">
                        <p className="table-body-sell">{key.markup}</p>
                      </div>
                      <div className="min-width-150">
                        <p className="table-body-sell">
                          {' '}
                          <span className="mr-1">
                            <TickIcon />
                          </span>
                          {key.stock}
                        </p>
                      </div>
                      <div className="min-width-250">
                        <p className="table-body-sell">
                          {key.createdOn}{' '}
                          <span className="mx-3">
                            <DotIcon />
                          </span>{' '}
                          <EditIcon />
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="d-flex mx-4 justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center ">
            <p className="table-body-sell border-left-dark-voilet w-50px pr-3 mb-0">50</p>
            <p className="table-body-sell border-left-dark-voilet w-50px px-3 mb-0">100</p>
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
