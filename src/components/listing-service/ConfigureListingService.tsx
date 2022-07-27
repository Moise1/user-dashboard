import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { ListingService } from 'src/redux/dashboard/listingServicesSlice';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import '../../sass/listing-service/configure-listing-service.scss';
import { Channel, ChannelsState } from 'src/redux/channels/channelsSlice';
import { MultipleSelector } from 'src/small-components/form/multipleSelector';
import { Selector, SelectorValue } from 'src/small-components/form/selector';
import { Input, Radio, RadioChangeEvent, Row, Spin, Modal } from 'antd';
import { SimpleTable } from 'src/small-components/tables/simple-table';
//import { CrossModalIcon } from '../common/Icons';
import { useEffect, useState } from 'react';
import { Source } from '../../redux/sources/sourceSlice';
import { getListingServices, addListingService } from '../../redux/dashboard/listingServicesThunk';
import { countryFlag } from '../../utils/countryFlag';
import { shopLogo } from '../../utils/shopLogo';
import { toastAlert } from '../../utils/toastAlert';
import { eCountry } from '../../types/eCountry';

export const ConfigureListingService = () => {
  const dispatch = useAppDispatch();
  const { listingServicesResult, loading } = useAppSelector((state) => state.listingServices);
  const { sources } = useAppSelector((state) => state.sources);
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels as ChannelsState);
  const criteriaOptions = [
    { value: 'hgr', label: 'No preferences' },
    { value: 'user', label: 'Set up my preferences' }
  ];
  const [selectedChannel, setSelectedChannel] = useState<Channel>();
  const [selectedListing, setSelectedListing] = useState<ListingService>(listingServicesResult[0]);
  const [showPreference, setShowPreference] = useState(false);
  const [pricePreference, setPricePreference] = useState('source');
  const [minSourcePrice, setMinSourcePrice] = useState<number>();
  const [maxSourcePrice, setMaxSourcePrice] = useState<number>();
  const [minProfit, setMinProfit] = useState<number>();
  const [maxProfit, setMaxProfit] = useState<number>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sourceList, setSourceList] = useState([]);
  const [showFlags] = useState<boolean>(true);
  const SourceLabel = (c: Source) => {
    return (
      <>
        {showFlags && countryFlag(eCountry[c.site])}
        {c.name}
      </>
    );
  };
  const SourceValue = (c: Source) => {
    return {
      value: c.id,
      site: c.site,
      label: <>{SourceLabel(c)}</>
    };
  };
  const CreateLabel = (c: Channel) => {
    return (
      <>
        {showFlags && shopLogo(c.channelId)}
        {showFlags && countryFlag(c.isoCountry)}
        {c.name}
      </>
    );
  };
  const CreateValue = (c: Channel) => {
    return {
      value: c.id,
      label: <>{CreateLabel(c)}</>
    };
  };
  const options = channels.map(CreateValue);
  const SourceOptions = sources.map(SourceValue);
  const [selectedService, setSelectedService] = useState<ListingService>(listingServicesResult[0]);
  const [isDisabled, setIsDisabled] = useState(selectedService.startedOn ? true : false);

  useEffect(() => {
    dispatch(getListingServices());
  }, [getListingServices]);

  const info = () => {
    Modal.info({
      title: 'Hustle Got Real',
      content: (
        <div>
          <p>
            Your prefrences have been saved. Your Listings will be updated within the next 72 hours. Thank you for using
            our listing service!
          </p>
        </div>
      ),
      onOk() {
        console.log('success');
      }
    });
  };

  const onOptionsChange = (e: RadioChangeEvent) => {
    setPricePreference(e.target.value);
  };

  const onMinProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinProfit(parseFloat(e.target.value));
  };

  const onMaxProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxProfit(parseFloat(e.target.value));
  };

  const onMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinSourcePrice(parseFloat(e.target.value));
  };

  const onMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSourcePrice(parseFloat(e.target.value));
  };

  const getListingServiceStatus = (s: ListingService) => {
    if (!s.startedOn) return 'Waiting preferences...';

    if (s.endedOn) return 'Done';

    return 'Our team is working on your listings';
  };

  const onSourceChange = (value: string) => {
    setSelectedListing((prev) => ({ ...prev, includedSources: value }));
  };

  const onAccountChange = (value: SelectorValue) => {
    const chanel = channels.filter((x) => x.id === value);
    if (selectedListing.channelOAuthId !== value) {
      setSelectedListing((prev) => ({ ...prev, includedSources: '' }));
    }
    setSelectedChannel(chanel[0]);
    const filtered = SourceOptions?.filter((x: { site: string }) => {
      if (x.site == eCountry[chanel[0]?.isoCountry as unknown as number]) return x;
    });
    setSourceList(filtered);
    setSelectedListing((prev) => ({ ...prev, channelOAuthId: chanel[0]?.id }));
  };

  const onChange = (value: SelectorValue) => {
    if (value === 'user') {
      setShowPreference(true);
    } else {
      setShowPreference(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const saveData = async () => {
    const rp = await dispatch(addListingService(selectedListing));
    if (!rp.payload?.success) {
      info();
      const rs = dispatch(getListingServices());
      const pl = (await rs).payload;
      setSelectedService(pl[0]);
      setIsDisabled(pl[0].startedOn ? true : false);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    const sdate = new Date();
    setSelectedListing((prev) => ({
      ...prev,
      startedOn: sdate.toJSON()
    }));
    saveData();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  const handleSubmit = () => {
    if (selectedChannel == undefined) {
      toastAlert('Please select the Account Channel', 'warning');
    } else {
      showModal();
    }
    const sdate = new Date();
    setSelectedListing((prev) => ({
      ...prev,
      minSourcePrice: minSourcePrice,
      maxSourcePrice: maxSourcePrice,
      minProfit: minProfit,
      maxProfit: maxProfit,
      startedOn: sdate.toJSON()
    }));
  };

  useEffect(() => {
    setSourceList(SourceOptions);
    if (listingServicesResult[0].channelOAuthId && listingServicesResult[0].channelOAuthId != 0) {
      setShowPreference(true);
      onAccountChange(listingServicesResult[0].channelOAuthId);
      if (selectedListing.minSourcePrice || selectedListing.maxSourcePrice) {
        setPricePreference('source');
        setMinSourcePrice(selectedListing.minSourcePrice);
        setMaxSourcePrice(selectedListing.maxSourcePrice);
      }
      if (selectedListing.minProfit || selectedListing.maxProfit) {
        setPricePreference('profit');
        setMinProfit(selectedListing.minProfit);
        setMaxProfit(selectedListing.maxProfit);
      }
    }
  }, [loading]);
  const columns = [
    {
      title: 'Account',
      dataIndex: '',
      key: 'name',
      render: (s: ListingService) => {
        return (
          <Selector
            placeHolder="Select channel"
            defaultValue={s.channelOAuthId}
            onChange={onAccountChange}
            disabled={isDisabled}
          >
            {options}
          </Selector>
        );
      }
    },
    {
      title: 'Criteria',
      dataIndex: '',
      key: '',
      render: (s: ListingService) => {
        return (
          <Selector
            placeHolder="No preferences"
            onChange={onChange}
            defaultValue={s.startedOn ? 'user' : 'hgr'}
            disabled={isDisabled}
          >
            {criteriaOptions}
          </Selector>
        );
      }
    },
    {
      title: 'Listings',
      dataIndex: '',
      key: '',
      render: (s: ListingService) => <h4>{s.listings}</h4>
    },
    {
      title: 'Status',
      dataIndex: '',
      key: '',
      render: (s: ListingService) => {
        return <p>{getListingServiceStatus(s)}</p>;
      }
    },
    {
      title: 'Date',
      dataIndex: '',
      key: '',
      render: (s: ListingService) => (
        <h4>{s.purchasedOn && new Date(s.purchasedOn as unknown as string).toLocaleString()}</h4>
      )
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: '',
      render: (s: ListingService) => (
        <div onClick={handleSubmit}>
          {!isDisabled && <ConfirmBtn className="list">List {s.listings} products</ConfirmBtn>}
        </div>
      )
    }
  ];

  return loading ? (
    <Spin />
  ) : (
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

      <div className="listingservices-table">
        {listingServicesResult?.length ? (
          <SimpleTable columns={columns} dataSource={listingServicesResult} hidePagination={true} />
        ) : (
          noSuscribed
        )}
      </div>
      {showPreference && (
        <div className="configuration-section">
          {listingServicesResult?.length ? (
            <div className="listingservice-configuration">
              <h3>
                {selectedListing.listings} listing service ({selectedChannel?.name})
              </h3>
              <div className="listingservice-configuration-container">
                <div className="sources-options">
                  <div className="sources">
                    <div className="included-sources">
                      <Row>
                        <h3>Include sources </h3>
                      </Row>
                      <MultipleSelector
                        placeHolder="Select your sources"
                        style={{ width: '100%' }}
                        className="multipleSelector"
                        value={selectedListing.includedSources}
                        disabled={isDisabled}
                        onChange={(value: string) => onSourceChange(value)}
                      >
                        {sourceList.length > 0 ? sourceList : SourceOptions}
                      </MultipleSelector>
                    </div>
                  </div>
                </div>

                <div className="price-options">
                  <Radio.Group value={pricePreference} onChange={onOptionsChange}>
                    <Radio name="source" value="source">
                      Source price preference
                    </Radio>
                    <Radio name="profit" value="profit">
                      Profit preference
                    </Radio>
                  </Radio.Group>
                  {pricePreference === 'profit' ? (
                    <div className="inputs-container">
                      <label>Profit</label>
                      <div className="inputs">
                        <Input
                          placeholder="Min"
                          value={minProfit}
                          onChange={(e) => onMinProfitChange(e)}
                          className="blue-input"
                          disabled={isDisabled}
                        />
                        <Input
                          placeholder="Max"
                          className="blue-input"
                          value={maxProfit}
                          onChange={(e) => onMaxProfitChange(e)}
                          disabled={isDisabled}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="inputs-container">
                      <label>Source Price</label>
                      <div className="inputs">
                        <Input
                          placeholder="Min"
                          value={minSourcePrice}
                          onChange={(e) => onMinChange(e)}
                          className="blue-input"
                          disabled={isDisabled}
                        />
                        <Input
                          placeholder="Max"
                          className="blue-input"
                          value={maxSourcePrice}
                          onChange={(e) => onMaxChange(e)}
                          disabled={isDisabled}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
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

      <Modal
        title="Start Listing"
        visible={isModalVisible}
        onOk={handleOk}
        okText="Yes, start listing!"
        onCancel={handleCancel}
        cancelText="Review Preferences"
      >
        <p>
          Please make sure you have set your listing preferences. Once the team starts the listings they can NOT be
          modified.
        </p>
      </Modal>
    </div>
  );
};
