import { Layout, Form, Input, Button, DatePicker, Spin, Modal, Tooltip } from 'antd';
import { Row, Col, Collapse } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';

import '../../sass/list-now/manual-listing.scss';
import '../../sass/list-now/bulk-listing.scss';
import { getUserAssistants } from '../../redux/va-profiles/vaProfilesThunk';
import { eChannelListingStatus } from '../../redux/listings/listingsSlice';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { useEffect, useState } from 'react';
import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { StatusBar } from 'src/small-components/StatusBar';
import Spreadsheet, { Matrix } from 'react-spreadsheet';
import { Selector, SelectorValue } from '../../small-components/form/selector';
import { UserAssistant } from '../../redux/va-profiles/vaProfilesSlice';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { SimpleTable } from '../../small-components/tables/simple-table';
import moment from 'moment';
import { Key } from 'antd/es/table/interface';
import {
  AutoListState,
  BulkListingError,
  BulkListingLog,
  eBulkListingStatus,
  BulkListingsDataToSave
} from '../../redux/listings/autoListSlice';
import { getAutolist, saveAutolist } from '../../redux/listings/autoListThunk';
import { getSources } from '../../redux/sources/sourcesThunk';
import { SourcesState } from '../../redux/sources/sourceSlice';
import { CheckOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Item } = Form;
const { Panel } = Collapse;

export const BulkListing = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  const { autoList } = useAppSelector((state) => state.autoList as AutoListState);
  const { sources, loading: loadingSources } = useAppSelector((state) => state.sources as SourcesState);
  const { userAssistants, VAloading } = useAppSelector((state) => state.userAssistants);
  const lables = ['Source URL', 'Listing Title (Optional)'];

  // props for form
  const [createdBy, setCreatedBy] = useState<number>();
  const [ignoreVero, setIgnoreVero] = useState<string>('false');
  const [ignoreOOS, setIgnoreOOS] = useState<string>('true');
  const [reviewBeforePublishing, setReviewBeforePublishing] = useState<string>('false');
  const [listFrequencyMinutes, setListFrequencyMinutes] = useState<number>();
  const [dontListUntil, setDontListUntil] = useState<Date>();

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
    [{ value: '' }, { value: '' }]
  ]);

  useEffect(() => {
    dispatch(getSources());
    dispatch(getUserAssistants());
    const data = { summary: null };
    dispatch(getAutolist(data));
  }, [getSources, getUserAssistants, getAutolist]);

  const onSave = async (values: BulkListingsDataToSave) => {
    dispatch(saveAutolist(values));
  };

  const [listing, setListing] = useState<string[][]>([]);

  const onListItems = () => {
    let _ignoreVero;
    if (ignoreVero === 'true') {
      _ignoreVero = true;
    } else if (ignoreVero === 'false') {
      _ignoreVero = false;
    }
    let _ignoreOOS;
    if (ignoreOOS === 'true') {
      _ignoreOOS = true;
    } else if (ignoreOOS === 'false') {
      _ignoreOOS = false;
    }
    let _reviewBeforePublishing;
    if (reviewBeforePublishing === 'true') {
      _reviewBeforePublishing = true;
    } else if (reviewBeforePublishing === 'false') {
      _reviewBeforePublishing = false;
    }

    setListing([]);
    data.map((item) => {
      if (item[0]?.value || item[1]?.value) {
        const val1 = item[0]?.value ? item[0]?.value : '';
        const val2 = item[1]?.value ? item[1]?.value : '';
        listing.push([val1, val2]);
      }
    });

    const value: BulkListingsDataToSave = {
      createdBy: createdBy as number,
      ignoreVero: _ignoreVero,
      ignoreOOS: _ignoreOOS,
      dontListUntil: dontListUntil,
      reviewBeforePublishing: _reviewBeforePublishing,
      listFrequencyMinutes: listFrequencyMinutes as number,
      listings: listing
    };
    onSave(value);
  };

  const addRows = () => {
    setData((olddata) => [
      ...olddata,
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }],
      [{ value: '' }, { value: '' }]
    ]);
  };

  const handleAssistantChange = (value: SelectorValue) => {
    setCreatedBy(value as number);
  };

  const handleIgnoreVeroChange = (value: SelectorValue) => {
    setIgnoreVero(value as string);
  };

  const handleIgnoreOOSChange = (value: SelectorValue) => {
    setIgnoreOOS(value as string);
  };

  const handleReviewBeforePublishing = (value: SelectorValue) => {
    setReviewBeforePublishing(value as string);
  };

  const handleListFrequencyMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListFrequencyMinutes(Number(event.target.value));
  };

  const onChange = (value: DatePickerProps['value'] | RangePickerProps['value'], dateString: string) => {
    const date = new Date(dateString);

    setDontListUntil(date);
    console.log('Selected Time: ', dontListUntil);
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  const EmptyGuid = () => {
    return '00000000-0000-0000-0000-000000000000';
  };

  const Zero = () => {
    return 0;
  };

  const ErrorDetail = (errorCode: BulkListingError | undefined) => {
    switch (errorCode) {
      case BulkListingError.UNKOWN:
      case BulkListingError.INVALID_ORDER:
        return <text>Unknown error</text>;
      case BulkListingError.INVALID_TOKEN:
        return <text>Account disconnected. Relink it again</text>;
      case BulkListingError.SCRAPING:
        return <text>It was impossible to obtain information from this url</text>;
      case BulkListingError.NO_CATEGORY:
        return <text>It was impossible to obtain a category for this product</text>;
      case BulkListingError.VERO:
        return <text>Product brand was in Vero List</text>;
      case BulkListingError.ZERO_TOKENS:
        return <text>Not enoguht tokens to optimize the title of this product</text>;
      case BulkListingError.OOS:
        return <text>Product was Out of Stock</text>;
      default:
        return errorCode;
    }
  };

  const ShowModal = (errorCode: BulkListingError | undefined) => {
    Modal.error({
      title: 'Error details',
      content: ErrorDetail(errorCode),
      onOk() {
        console.log('');
      }
    });
  };

  const PublishingError = () => {
    Modal.error({
      title: 'Error details',
      content: (
        <p>
          You can see this error on the &quot;Listings Created&quot; section, where you will also be able to edit the
          listing and retry. <br />
          Please note that for certain sources, listings with variations are not supported
        </p>
      ),
      onOk() {
        console.log('');
      }
    });
  };

  const columns = [
    {
      title: 'HGR Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: eBulkListingStatus) => {
        return eBulkListingStatus[s];
      }
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: 'Progress',
      dataIndex: 'channelListingStatus',
      key: 'channelListingStatus',
      render: (s: eChannelListingStatus, record: BulkListingLog) => {
        if (s && (s & eChannelListingStatus.Removed) != 0) {
          return <CheckOutlined />;
        } else if (record.status == eBulkListingStatus.ERROR) {
          return (
            <div className="div-danger" onClick={() => ShowModal(record.errorCode)}>
              <ExclamationCircleOutlined /> Not published. Click for details.
            </div>
          );
        } else if (
          record.status == eBulkListingStatus.DONE &&
          record.channelItem == null &&
          record.channelListingStatus &&
          record.channelListingStatus != eChannelListingStatus.PendingToReview &&
          record.channelListingStatus != eChannelListingStatus.Removed
        ) {
          return (
            <span>
              Listing{' '}
              <a href="/SearchProduct/PendingListings" target="_blank">
                <i className="fas fa-question-circle"></i>
              </a>
              ...
            </span>
          );
        } else if (record.status == eBulkListingStatus.VALIDATING) {
          return <LoadingOutlined />;
        } else if (record.status == eBulkListingStatus.PROCESSING) {
          return <LoadingOutlined />;
        } else {
          if (!record.channelItem) {
            if (
              record.status == eBulkListingStatus.DONE &&
              record.channelListingStatus &&
              record.channelListingStatus == eChannelListingStatus.PendingToReview
            ) {
              return (
                <Tooltip title="Since you selected the option to review your listings before they are published, you need to verify this product on the Listings Created section for it to be submitted">
                  <p>Pending Review</p>
                </Tooltip>
              );
            } else {
              return (
                <Tooltip title="Your listing will be published according to the schedule defined">
                  <p>Scheduled</p>
                </Tooltip>
              );
            }
          } else {
            if (record.channelItem) {
              return (
                <span>
                  <strong>Published</strong>
                </span>
              );
            } else {
              return (
                <div className="div-danger" onClick={() => PublishingError()}>
                  Error publishing
                </div>
              );
            }
          }
        }
      }
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (s: Date) => {
        return moment(s).format('DD/MM/YY/ hh:mm');
      }
    },
    {
      title: 'Published On',
      dataIndex: 'listedOn',
      key: 'listedOn',
      render: (s: Date, record: BulkListingLog) => {
        if (record.verifiedOn && record.channelItem) {
          return moment(s).format('DD/MM/YY/ hh:mm');
        }
      }
    }
  ];

  return (
    <Layout className="bulk-list-content">
      {loadingSources && VAloading ? (
        <Spin />
      ) : (
        <div className="content-bulk">
          <h1>Bulk Publish</h1>
          <div className="sections-container">
            <Row>
              <Col xs={{ span: 24, order: 2 }} md={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
                <div className="bulk-sections">
                  <div className="options-container">
                    <StatusBar className="bulk-options">
                      <> </>
                      <Form className="bulk-form" layout={'horizontal'}>
                        <Item label="Create As" name="createdBy">
                          {VAloading}
                          <Selector
                            defaultValue="select"
                            value={createdBy ? createdBy : 'select'}
                            onChange={handleAssistantChange}
                          >
                            {userAssistants?.map(({ name: label, id: value }: UserAssistant) => ({ value, label }))}
                          </Selector>
                        </Item>
                        <p>VA Profile selected as the creator of the listing</p>
                        <Item label="List Vero Items" name="ignoreVero">
                          <Selector defaultValue={ignoreVero} value={ignoreVero} onChange={handleIgnoreVeroChange}>
                            {[
                              { label: 'Yes', value: 'true' },
                              { label: 'No', value: 'false' }
                            ]}
                          </Selector>
                        </Item>
                        <p>Yes: List VeRo items No: Do not list VeRo items (recommended) What is a VeRo item?</p>
                        <Item label="List Out of Stock Items" name="ignoreOOS">
                          <Selector defaultValue={ignoreOOS} value={ignoreOOS} onChange={handleIgnoreOOSChange}>
                            {[
                              { label: 'Yes', value: 'true' },
                              { label: 'No', value: 'false' }
                            ]}
                          </Selector>
                        </Item>
                        <p>Yes: List items even if they are OOS No: Do not list OOS items</p>
                        <Item label="Don't list until" name="dontListUntil">
                          <DatePicker
                            showTime={{ format: 'hh:mm A' }}
                            format="YYYY-MM-DD hh:mm A"
                            onChange={onChange}
                            onOk={onOk}
                          />
                        </Item>
                        <Item label="Listing frequency" name="listFrequencyMinutes">
                          <Input
                            className="blue-input"
                            type="number"
                            value={listFrequencyMinutes}
                            placeholder="0"
                            onChange={handleListFrequencyMinutes}
                          />
                        </Item>
                        <p>The system will automatically list an item every X minutes.</p>
                        <Item label="Review listings" name="reviewBeforePublishing">
                          <Selector
                            defaultValue={reviewBeforePublishing}
                            value={reviewBeforePublishing}
                            onChange={handleReviewBeforePublishing}
                          >
                            {[
                              { label: 'Yes', value: 'true' },
                              { label: 'No', value: 'false' }
                            ]}
                          </Selector>
                        </Item>
                        <p>
                          Yes: Review each listing before updating it on my store
                          <br />
                          No: List items automatically on my store.
                        </p>
                      </Form>
                    </StatusBar>
                  </div>
                </div>
              </Col>
              <Col xs={{ span: 24, order: 1 }} md={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
                <Spreadsheet data={data} onChange={setData} columnLabels={lables} className="spreadsheet" />
                <Button onClick={addRows}>Add 10 rows</Button>
                <div className="table-container">
                  <div className="button-container" onClick={onListItems}>
                    <Item>
                      <ConfirmBtn>List items</ConfirmBtn>
                    </Item>
                  </div>
                </div>
              </Col>
            </Row>
            {autoList && autoList.summary && autoList.summary.requestId !== EmptyGuid() && (
              <Row>
                <Col sm={24}>
                  <div className="bulk-summary">
                    <div className={autoList.summary.notDone == 0 ? 'alert-success' : 'alert-danger'}>
                      <h4>
                        <div className="summary-heading">
                          <strong>{autoList.summary.done} urls are successfully being listed.</strong>
                        </div>
                      </h4>
                      <Collapse>
                        {autoList.summary.duplicatedUrls?.length > 0 ? (
                          <Panel
                            header={
                              'View ' + autoList.summary.duplicatedUrls.length + ' duplicated products on your store.'
                            }
                            key="1"
                          >
                            <p>
                              {autoList.summary.duplicatedUrls?.map((x: string, key: Key) => {
                                return <p key={key}>{x}</p>;
                              })}
                            </p>
                          </Panel>
                        ) : (
                          ''
                        )}

                        {autoList.summary.existingListingUrls?.length > 0 ? (
                          <Panel
                            header={
                              'View ' +
                              autoList.summary.existingListingUrls.length +
                              ' duplicated products on the list.'
                            }
                            key="2"
                          >
                            <p>
                              {autoList.summary.existingListingUrls?.map((x: string, key: Key) => {
                                return <p key={key}>{x}</p>;
                              })}
                            </p>
                          </Panel>
                        ) : (
                          ''
                        )}

                        {autoList.summary.forbiddenWordsUrls?.length > 0 ? (
                          <Panel
                            header={
                              'View ' + autoList.summary.forbiddenWordsUrls.length + ' titles contains forbidden words.'
                            }
                            key="3"
                          >
                            <p>
                              {autoList.summary.forbiddenWordsUrls?.map((x: string, key: Key) => {
                                return <p key={key}>{x}</p>;
                              })}
                            </p>
                          </Panel>
                        ) : (
                          ''
                        )}

                        {autoList.summary.invalidSourceUrls?.length > 0 ? (
                          <Panel
                            header={'View ' + autoList.summary.invalidSourceUrls.length + ' invalid urls.'}
                            key="4"
                          >
                            <p>
                              {autoList.summary.invalidSourceUrls?.map((x: string, key: Key) => {
                                return <p key={key}>{x}</p>;
                              })}
                            </p>
                          </Panel>
                        ) : (
                          ''
                        )}
                      </Collapse>

                      <p>
                        {autoList.summary.noQuota > 0 ? (
                          <span>No quota remaining by {autoList.summary.noQuota}.</span>
                        ) : (
                          ''
                        )}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            )}

            {autoList?.logs && autoList.logs.length > Zero() && (
              <Row>
                <Col>
                  <div className="bulk-log">
                    <SimpleTable columns={columns} dataSource={autoList.logs} />
                  </div>
                </Col>
              </Row>
            )}
          </div>
          <div className="manual-list-content">
            <div className="container-manual-listing">
              <div className="section-sources">
                <h2>Suported suppliers</h2>
                <Row gutter={[16, 8]}>
                  {sources?.map(
                    (itm: {
                      id: number | undefined;
                      name: string | undefined;
                      baseUrl: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
                    }) => {
                      return (
                        <Col span={6} key={itm.id}>
                          <a href={'ChannelListing/BuyNow?sourceUrl=' + itm.baseUrl} target="_blank" rel="noreferrer">
                            <div className="list-card">
                              {' '}
                              {loadingSources}
                              {/* eslint-disable @typescript-eslint/no-var-requires */}
                              <img
                                width="159"
                                height="38"
                                alt="sourcelogo"
                                src={require('../../assets/logos/' + itm.id + '.png').default}
                              ></img>
                              <br />
                              <h3>{itm.name}</h3>
                            </div>
                          </a>
                        </Col>
                      );
                    }
                  )}
                </Row>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
