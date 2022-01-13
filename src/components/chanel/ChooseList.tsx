import catalog_icon from '../../assets/channel/list/Group 2.png';
import manual_icon from '../../assets/channel/list/Group 147.png';
import bulk_icon from '../../assets/channel/list/Group 4.png';
import we_icon from '../../assets/channel/list/Group 148.png';
import { t } from '../../global/transShim';

export interface chooseListValues {
  platform: platformType;
  storeLocation: string;
  api: string;
  user: string;
  list: string;
  extension: string;
}

interface props {
  handleChangeList: (key: string) => void;
  values: chooseListValues;
  step: number;
  platform: platformType;
  list: string;
}

function ChooseList(props: props) {

  const {handleChangeList, values,  platform, list } = props;
  
  return (
    <div className="choose-list">
      <div className="text-center mx-auto col-md-6 px-0 px-md-2">
        <h5 className="font-weight-bold mb-0">{t('step5h')}</h5>
      </div>

      <div className="col-md-10 mx-auto col-6 px-md-3 px-0 mb-2">
        <label className="mb-0 h-100">
          <input
            type="radio"
            name="product"
            className="card-input-element"
            value={'catalog'}
            onChange={() => handleChangeList('catalog')}
          />
          <div
            className={`panel panel-default card-input h-100 my-1 py-1 py-md-0 ${
              list == 'catalog' ? 'border bg-sm-purple' : ''
            }
            `}
          >
            <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
              <div className="">
                <img
                  src={catalog_icon}
                  alt="icon"
                  className={`w-md-100 ${list == 'catalog' ? 'filter-white' : ''}`}
                />
              </div>
              <div className="px-md-2">
                <h5 className={`font-weight-bold  ${list == 'catalog' ? 'text-sm-white' : ''}`}>
                  {t('cata')}
                </h5>
                <div className="lh-1 d-md-block d-none">{t('catapara')}</div>
              </div>
              <div className="text-right d-md-block d-none">
                <i className="fas  fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="col-md-10 mx-auto col-6  px-md-3 px-0 mb-2">
        <label className="mb-0 h-100">
          <input
            type="radio"
            name="product"
            className="card-input-element"
            value={'Manual'}
            onChange={() => handleChangeList('manual')}
          />
          <div
            className={`panel panel-default card-input   h-100 my-1 py-1 
            ${list == 'manual' ? 'border bg-sm-purple' : ''}
            `}
          >
            <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
              <div className="">
                <img
                  src={manual_icon}
                  alt="icon"
                  className={`w-md-100 ${list == 'manual' ? 'filter-white' : ''}`}
                />
              </div>
              <div className="px-md-2">
                <h5 className={`font-weight-bold  ${list == 'manual' ? 'text-sm-white' : ''}`}>
                  {t('manual')}
                </h5>
                <div className="lh-1 d-md-block d-none">{t('manualpara')}</div>
              </div>
              <div className="text-right d-md-block d-none">
                <i className="fas  fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="col-md-10 mx-auto col-6 px-md-3 px-0 mb-2">
        <label className="mb-0 h-100">
          <input
            type="radio"
            name="product"
            className="card-input-element"
            value={'bulk'}
            onChange={() => handleChangeList('bulk')}
          />
          <div
            className={`panel panel-default card-input   h-100 my-1 py-1 py-md-0 
            ${list == 'bulk' ? 'border bg-sm-purple' : ''}
            `}
          >
            <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
              <div className="">
                <img
                  src={bulk_icon}
                  alt="icon"
                  className={`w-md-100 ${list == 'bulk' ? 'filter-white' : ''}`}
                />
              </div>
              <div className="px-md-2">
                <h5 className={`font-weight-bold  ${list == 'bulk' ? 'text-sm-white' : ''}`}>{t('bulk')}</h5>
                <div className="lh-1 d-md-block d-none">{t('bulkpara')}</div>
              </div>
              <div className="text-right d-md-block d-none">
                <i className="fas  fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
              </div>
            </div>
          </div>
        </label>
      </div>
      {platform == 'ebay' ? (
        <>
          <div className="col-md-10 mx-auto col-6 px-md-3 px-0 mb-2">
            <label className="mb-0 h-100">
              <input
                type="radio"
                name="product"
                className="card-input-element"
                value={'we'}
                onChange={() => handleChangeList('we')}
              />
              <div
                className={`panel panel-default card-input  h-100 my-1 py-1
            ${list == 'we' ? 'border bg-sm-purple' : ''}
            `}
              >
                <div className="d-md-flex d-block justify-content-around align-items-center text-center text-md-left">
                  <div className="">
                    <img
                      src={we_icon}
                      alt="icon"
                      className={`w-md-100 ${list == 'we' ? 'filter-white' : ''}`}
                    />
                  </div>
                  <div className="px-md-2">
                    <h5 className={`font-weight-bold  ${list == 'we' ? 'text-sm-white' : ''}`}>
                      {t('welist')}
                    </h5>
                    <div className="lh-1 d-md-block d-none">{t('welistpara')}</div>
                    <button className="bg-success border-0 text-white br-8 mt-2 sale-tag">
                      {t('btnlist')}
                    </button>
                  </div>
                  <div className="text-right d-md-block d-none">
                    <i className="fas  fa-long-arrow-alt-right ml-2 fa-lg pt-1"></i>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </>
      ) : (
        ''
      )}
      <div className="mx-auto text-md-center text-right col-12 mt-2 next-fix">
        <div className="d-block d-md-none text-center w-100">
          <div
            className={`text-danger w-100 text-center font-weight-bold ${values.list == '' ? '' : 'd-none'} `}
          >
            {t('listcheck')}
          </div>
        </div>
        <div className="d-block d-md-none">
          <div
            className={`w-100 text-center my-4 py-5 font-weight-bold ${values.list == '' ? 'd-none' : ''} `}
          >
            <h5 className="font-weight-bold  mb-0">
              {list == 'catalog'
                ? ' Catalog Listing'
                : list == 'manual'
                  ? ' Manual Listing'
                  : list == 'bulk'
                    ? 'Manual Listing'
                    : list == 'we'
                      ? 'We List for you'
                      : ''}
            </h5>
            <div>{t('favsupp')}</div>
          </div>
        </div>
        <div className="d-md-block d-none w-100 text-center lh-1">
          <div
            className={` text-danger w-100 text-center font-weight-bold ${
              values.list == '' ? '' : 'd-none'
            } `}
          >
            {t('listcheck')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseList;
