import { FormattedDate, FormattedTime, FormattedNumber } from 'react-intl';
import { DotIcon, EditIcon, TickIcon } from '../common/Icons';
import { rowData } from './ListingTable';

interface props {
  data: rowData;
}
export function ListingTableRow(props: props) {
  const key = props.data;
  return (
    <>
      <div className="listingTableRow border-bottom-body my-3 ">
        <div className="d-flex  align-items-center justify-content-center justify-content-md-start">
          <div className="select-all-listing-checkbox form-group d-flex  align-items-center justify-content-center">
            {/* <input type="checkbox" className="form-check-input mt-2" id="exampleCheck1" />
            <label key={key.id} htmlFor="exampleCheck1" className="form-check-label ml-4 ">
          </label> */}

            <label className="select-all-checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <img className="d-none d-md-block" src={key.selectall} alt="" />
          </div>
        </div>
        <div>
          <img className="d-md-none" src={key.selectall} alt="" />

          <p className="table-body-style">{key.itemNo}</p>
        </div>
        <div className="d-none d-md-block">
          <p className="table-body-style">{key.source}</p>
        </div>
        <div>
          <p className="table-body-title">{key.title}</p>
        </div>
        <div className="d-none d-md-block">
          <p className="table-body-sell">
            <FormattedNumber value={key.sell} style="currency" currency="EUR" />
          </p>
        </div>
        <div className="d-none d-md-block">
          <p className="table-body-sell">
            <FormattedNumber value={key.cost} style="currency" currency="EUR" />
          </p>
        </div>
        <div>
          <p className="table-body-profit">
            <FormattedNumber value={key.profit} style="currency" currency="EUR" />
          </p>
        </div>
        <div className="d-none d-md-block">
          <p className="table-body-sell">{key.markup}</p>
        </div>
        <div>
          <p className="table-body-sell">
            {' '}
            <span className="mr-1">
              <TickIcon />
            </span>
            {key.stock}
          </p>
        </div>
        <div className="">
          <p className="table-body-sell">
            <FormattedDate value={key.createdOn} /> <FormattedTime value={key.createdOn} />
          </p>
        </div>
        <div className="d-flex">
          <span className="mx-3  ">
            <DotIcon />
          </span>
          <span className="d-none d-md-block">
            <EditIcon />
          </span>
        </div>
      </div>
    </>
  );
}
