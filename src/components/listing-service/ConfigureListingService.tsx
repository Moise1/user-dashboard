import { useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { ListingService } from 'src/redux/dashboard/listingServicesSlice';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import '../../sass/listing-service/configure-listing-service.scss';
import { Channel } from 'src/redux/channels/channelsSlice';

import { Selector } from 'src/small-components/form/selector';
import { Divider, Input, Radio, Spin } from 'antd';
import { SimpleTable } from 'src/small-components/simple-table';
import { CrossModalIcon } from '../common/Icons';
import { useState } from 'react';

export const ConfigureListingService = () => {
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);

  const [selectedChannel] = useState('teststore');

  const { listingServicesResult, loading } = useAppSelector((state) => state.listingServices);

  const { sources } = useAppSelector((state) => state.sourcesReducer);

  console.log(sources);
  console.log(listingServicesResult);

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
              <h3>
                Configure {listingServicesResult.quantity} listing service for the account: {selectedChannel}
              </h3>
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
                <div className="inputs-container">
                  <label>Source price</label>
                  <div className="inputs">
                    <Input placeholder="Min" className="blue-input" />
                    <Input placeholder="Max" className="blue-input" />
                  </div>
                </div>
              </div>
              <ConfirmBtn className="list">Start listing service with selected preferences</ConfirmBtn>
            </div>
          ) : (
            noSuscribed
          )}
        </div>
      )}
      <div className="explanation-section">
        <h2>Is your store ready for us to start listing?</h2>
        <p>
          <strong>If you are selling on eBay:</strong>
        </p>
        <p>
          Make sure your billing information is completed. eBay requires you to set up a billing method with them before
          they enable your seller account. In order to do so, you can do the following:
        </p>
        <p>
          Access your eBay account and introduce your billing details (AU, DE, ES, FR, IT, USA, UK). If you are not able
          to find the section, please contact eBay via the chat on their site and request them to send you the link to
          complete your billing details.
        </p>
        <p>
          <strong>Your listing settings</strong>
        </p>

        <p>
          To make sure we list according to your preferences, please access your Hustle Got Real account and configure
          your channel settings.
        </p>
        <h2>Your listing preferences</h2>
        <p>
          <strong>Profit preferences</strong>
        </p>
        <p>
          Once you have purchased the service, you will be able to select your profit and suppliers preferences. Please
          note that when we calculate the profit we are referring to the net profit you will have once the item is sold.
          (already considering PayPal and eBay or Amazon estimated fees).
        </p>
        <p>Profit = buying price - selling price - fees</p>
        <p>
          If you choose a high minimum profit (higher than 3) your items will be much more expensive and therefore
          harder to sell. We recommend that option for more expert drop shippers.
        </p>
        <p>
          <strong>Suppliers preferences</strong>
        </p>
        <p>
          The important thing to consider when choosing the suppliers is shipping time. Please note that this will vary
          from one supplier to another. Some suppliers also need you to have a dropshipping account to get started, so
          please bear that in mind when setting up your preferences.
        </p>
      </div>
    </div>
  );
};
