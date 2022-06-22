import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { ListingService } from 'src/redux/dashboard/listingServicesSlice';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import '../../sass/listing-service/configure-listing-service.scss';
import { Channel } from 'src/redux/channels/channelsSlice';

import { Selector } from 'src/small-components/form/selector';
import { Divider, Radio, Spin } from 'antd';
import { SimpleTable } from 'src/small-components/simple-table';
import { CrossModalIcon } from '../common/Icons';

export const ConfigureListingService = () => {
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);

  const { listingServicesResult, loading } = useAppSelector((state) => state.listingServices);

  const { sources } = useAppSelector((state) => state.sourcesReducer);

  console.log(sources);

  const noSuscribed = (
    <div className="nosuscribed-container">
      <div className="nosuscribed">
        <h3>{"Oops it looks like you don't have any no api server contracted."}</h3>
        <p>Do you want to keep your NO API extension running 24/7?</p>
        <p>We can do it for you for only 12.99GBP/month.</p>
        <ConfirmBtn>
          <a
            href="https://hustlegotreal.com/en/no-api-server/"
            rel="noreferrer"
            target="_blank"
            className="footer-link"
          >
            Read more
          </a>
        </ConfirmBtn>
      </div>
    </div>
  );

  const columns = [
    {
      title: 'Account',
      dataIndex: '',
      key: 'name',
      render: () => {
        return (
          <Selector placeHolder="Select channel">
            {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
          </Selector>
        );
      }
    },
    {
      title: 'Criteria',
      dataIndex: '',
      key: '',
      render: () => {
        return (
          <Selector placeHolder="No preferences">
            {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
          </Selector>
        );
      }
    },
    {
      title: 'Listings',
      dataIndex: '',
      key: '',
      render: (s: ListingService) => <h4>{s.quantity}</h4>
    },
    {
      title: 'Status',
      dataIndex: '',
      key: '',
      render: () => {
        return <p>Waiting preferences...</p>;
      }
    },
    {
      title: 'ACtions',
      dataIndex: '',
      key: '',
      render: () => {
        return <ConfirmBtn>Start listing</ConfirmBtn>;
      }
    },
    {
      title: 'Date',
      dataIndex: '',
      key: '',
      render: (s: ListingService) => <h4>{s.quantity}</h4>
    }
  ];

  return (
    <div className="configure-listingservice-container">
      <h1>Configure listing services</h1>
      <p>
        We will carefully select the products to list in your account, we just need you to tell us which account you
        would like us to use.
      </p>
      <p>
        If you don{"'"}t have any specific preferences, we will choose the items according to our criteria to help you
        sell as many of them as possible. Alternatively, you can select Your Criteria on Criteria column and enter your
        preferences there.
      </p>
      {loading ? (
        <Spin />
      ) : (
        <div className="listingservices-table">
          {listingServicesResult?.length ? (
            <SimpleTable columns={columns} dataSource={listingServicesResult} />
          ) : (
            noSuscribed
          )}
        </div>
      )}
      {loading ? (
        <Spin />
      ) : (
        <div className="configuration-section">
          {listingServicesResult?.length ? (
            <div className="listingservice-configuration">
              <h3>Channel name</h3>
              <div className="sources-options">
                <div className="sources">
                  <div className="included-sources">
                    <label>Include sources </label>
                    <Selector placeHolder="Select...">
                      {sources?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
                    </Selector>
                  </div>
                </div>
                <div className="sources-resume">
                  <div className="sourcecard">
                    <h4>Amazon</h4>
                    <div className="remove-card">
                      <CrossModalIcon />
                    </div>
                  </div>
                  <div className="sourcecard">
                    <h4>Robert Dyas</h4>
                    <div className="remove-card">
                      <CrossModalIcon />
                    </div>
                  </div>
                  <div className="sourcecard">
                    <h4>Vida XL B2B</h4>
                    <div className="remove-card">
                      <CrossModalIcon />
                    </div>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="price-options">
                <Radio>Source price preference</Radio>
                <Radio>Profit preference</Radio>
              </div>
            </div>
          ) : (
            noSuscribed
          )}
        </div>
      )}
    </div>
  );
};
