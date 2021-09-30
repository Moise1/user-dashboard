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
        <div className="d-flex align-items-center">
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input mt-2" id="exampleCheck1" />
            <label key={key.id} htmlFor="exampleCheck1" className="form-check-label ml-4 ">
              <img src={key.selectall} className="img-responsive img-fluid" alt="" />
            </label>
          </div>
        </div>
        <div>
          <p className="table-body-style">{key.itemNo}</p>
        </div>
        <div>
          <p className="table-body-style">{key.source}</p>
        </div>
        <div>
          <p className="table-body-title">{key.title}</p>
        </div>
        <div>
          <p className="table-body-sell">
            <FormattedNumber value={key.sell} style="currency" currency="EUR" />
          </p>
        </div>
        <div>
          <p className="table-body-sell">
            <FormattedNumber value={key.cost} style="currency" currency="EUR" />
          </p>
        </div>
        <div>
          <p className="table-body-profit">
            <FormattedNumber value={key.profit} style="currency" currency="EUR" />
          </p>
        </div>
        <div>
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
        <div>
          <p className="table-body-sell">
            <FormattedDate value={key.createdOn} /> <FormattedTime value={key.createdOn} />
          </p>
        </div>
        <div>
          <span className="mx-3">
            <DotIcon />
          </span>
          <EditIcon />
        </div>
      </div>
    </>
  );
}
