import { Layout, Form, Input, Select, Button, DatePicker } from 'antd';
import { Row, Col } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

import '../../sass/list-now/manual-listing.scss';
import '../../sass/list-now/bulk-listing.scss';
import { getUserAssistants } from '../../redux/va-profiles/vaProfilesThunk';
import { getManualListings, SaveAutolist } from '../../redux/listings/listingsThunk';
import { ListingsData } from '../../redux/listings/listingsSlice';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { Key, useEffect, useState } from 'react';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { SimpleSelect } from '../../small-components/SimpleSelect';
import { StatusBar } from 'src/small-components/StatusBar';
import Spreadsheet, { Matrix } from 'react-spreadsheet';

const { Item } = Form;

export const BulkListing = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  const { manualListings, loadings } = useAppSelector((state) => state.manualListings);
  const { userAssistants, VAloading } = useAppSelector((state) => state.userAssistants);
  const { Option } = Select;
  const lables = ['Source URL', 'Listing Title (Optional)'];

  // props for form
  const [createdBy, setCreatedBy] = useState<string>();
  const [ignoreVero, setIgnoreVero] = useState<string>();
  const [ignoreOOS, setIgnoreOOS] = useState<string>();
  const [reviewBeforePublishing, setReviewBeforePublishing] = useState<string>();
  const [listFrequencyMinutes, setListFrequencyMinutes] = useState<number>();
  const [dontListUntil, setDontListUntil] = useState<string>();

  const [data, setData] = useState<Matrix<{ value: string }>>([
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
    [{ value: '' }, { value: '' }],
  ]);

  useEffect(() => {
    dispatch(getManualListings());
    dispatch(getUserAssistants());
  }, [getManualListings, getUserAssistants]);

  const onSave = async (values: ListingsData[]) => {
    await dispatch(
      SaveAutolist(values)
    );
  };

  function onListItems() {

    const value: ListingsData[] = [{
      createdBy: createdBy ? createdBy : '',
      ignoreVero: ignoreVero ? ignoreVero : '',
      ignoreOOS: ignoreOOS ? ignoreOOS : '',
      dontListUntil: dontListUntil ? dontListUntil : '',
      reviewBeforePublishing: reviewBeforePublishing ? reviewBeforePublishing : '',
      listFrequencyMinutes: listFrequencyMinutes ? listFrequencyMinutes : 0,
      data: data
    }];

    onSave(value);

    console.log('List Items: ' + data);
  }

  function addRows() {
    setData(olddata => [...olddata, [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }], [{ value: '' }, { value: '' }]]);
  }

  const TempOptions = userAssistants?.map((c: { id: Key | null | undefined; name: string | null | undefined }) => {
    return (
      <Option key={c.id} value={c.id?.toString()}>
        {c.name}
      </Option>
    );
  });

  const handleAssistantChange = (value: string) => {
    setCreatedBy(value);
  };

  const handleIgnoreVeroChange = (value: string) => {
    setIgnoreVero(value);
  };

  const handleIgnoreOOSChange = (value: string) => {
    setIgnoreOOS(value);
  };

  const handleReviewBeforePublishing = (value: string) => {
    setReviewBeforePublishing(value);
  };

  const handleListFrequencyMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListFrequencyMinutes(Number(event.target.value));
  };

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: string,
  ) => {
    setDontListUntil(dateString);
    console.log('Selected Time: ', dontListUntil);
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  return (
    <Layout className="bulk-list-content">
      <div className="sections-container">
        <h1>Bulk Listing</h1>
        <Row>
          <Col span={24}>
            <div className="bulk-sections">
              <div className="options-container">
                <StatusBar className="bulk-options">
                  <> </>
                  <Form className="bulk-form" layout={'horizontal'}>
                    <Item label="Create As" name="createdBy">{VAloading}
                      <SimpleSelect defaultValue="select" value={createdBy ? createdBy : 'select'} onChange={handleAssistantChange}>{TempOptions}</SimpleSelect>
                    </Item>
                    <p>VA Profile selected as the creator of the listing</p>
                    <Item label="List Vero Items" name="ignoreVero">
                      <SimpleSelect defaultValue="false" value={ignoreVero ? ignoreVero : 'false'} onChange={handleIgnoreVeroChange}>
                        <Option value="true" key="1">Yes</Option>
                        <Option value="false" key="2">No</Option>
                      </SimpleSelect>
                    </Item>
                    <p>Yes: List VeRo items No: Do not list VeRo items (recommended) What is a VeRo item?</p>
                    <Item label="List Out of Stock Items" name="ignoreOOS">
                      <SimpleSelect defaultValue="false" value={ignoreOOS ? ignoreOOS : 'false'} onChange={handleIgnoreOOSChange}>
                        <Option value="true" key="1">Yes</Option>
                        <Option value="false" key="2">No</Option>
                      </SimpleSelect>
                    </Item>
                    <p>Yes: List items even if they are OOS No: Do not list OOS items</p>
                    <Item label="Don't list until" name="dontListUntil">
                      <DatePicker showTime={{ format: 'hh:mm A' }}
                        format="YYYY-MM-DD hh:mm A" onChange={onChange} onOk={onOk} />
                    </Item>
                    <Item label="Listing frequency" name="listFrequencyMinutes">
                      <Input className="blue-input" type="number" value={listFrequencyMinutes} placeholder="0" onChange={handleListFrequencyMinutes} />
                    </Item>
                    <p>The system will automatically list an item every X minutes.</p>
                    <Item label="Review listings" name="reviewBeforePublishing">
                      <SimpleSelect defaultValue="false" value={reviewBeforePublishing ? reviewBeforePublishing : 'false'} onChange={handleReviewBeforePublishing}>
                        <Option value="true" key="1">Yes</Option>
                        <Option value="false" key="2">No</Option>
                      </SimpleSelect>
                    </Item>
                    <p>Yes: Review each listing before updating it on my store<br />
                      No: List items automatically on my store.</p>
                  </Form>
                </StatusBar>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Spreadsheet data={data} onChange={setData} columnLabels={lables} className="spreadsheet" />
            <Button onClick={addRows} >Add 10 rows</Button>
            <div className="table-container">

              <div className="button-container">
                <Item>
                  <Button type="primary" onClick={onListItems}>List items</Button>
                </Item>
              </div>
            </div>
          </Col>
        </Row>
        <div className="manual-list-content">
          <div className="container-manual-listing">
            <div className="section-sources">
              <h2>Suported suppliers</h2>
              <Row gutter={[16, 8]}>
                {manualListings.moreSources.map((itm: { id: number | undefined; name: string | undefined; baseUrl: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
                  return <Col span={6} key={itm.id}>
                    <a href={'ChannelListing/BuyNow?sourceUrl=' + itm.baseUrl} target="_blank" rel="noreferrer">
                      <div className="list-card"> {loadings}
                        <img width="159" height="38" alt="sourcelogo" src={require('../../assets/logos/' + itm.id + '.png').default} ></img>
                        <br />
                        <h3>{itm.name}</h3>
                      </div>
                    </a>
                  </Col>;
                })}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};