/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Layout, Form, Input } from 'antd';

import '../../sass/list-now/bulk-listing.scss';
import { getSources } from '../../redux/source-config/sourcesThunk';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { useEffect, useState } from 'react';

//import { SimpleTable } from '../tables/SimpleTable';
import { Selector } from '../../small-components/Selector';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { StatusBar } from 'src/small-components/StatusBar';
import { dummyDeliver } from 'src/dummy-data/dummyData';
import Spreadsheet from 'react-spreadsheet';

const { Item } = Form;

export const BulkListing = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  const { sources } = useAppSelector((state) => state.sources);

  const [data, setData] = useState([
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
    dispatch(getSources());
  }, [getSources]);

  console.log('Sources:', sources);

  console.log('test', sources?.sourceName);

  const lables = ['Source URL', 'Listing Title (Optional)'];

  //const columns = [
  //  {
  //    title: 'Source URL',
  //    dataIndex: 'sourceurl',
  //    key: 'sourceurl'
  //  },
  //  {
  //    title: 'Listings title (Optional)',
  //    dataIndex: 'listingstitle',
  //    key: 'listingstitle'
  //  }
  //];

  return (
    <Layout className="bulk-list-content">
      <div className="sections-container">
        <div className="bulk-sections">
          <div className="options-container">
            <StatusBar className="bulk-options">
              <> </>
              <Form className="bulk-form" layout={'horizontal'}>
                <Item label="Create As" name="sourceId">
                  <Selector defaultValue="Yes">{dummyDeliver}</Selector>
                </Item>
                <p>VA Profile selected as the creator of the listing</p>
                <Item label="List Vero Items" name="sourceId">
                  <Selector defaultValue="Yes">{dummyDeliver}</Selector>
                </Item>
                <p>Yes: List VeRo items No: Do not list VeRo items (recommended) What is a VeRo item?</p>
                <Item label="List Out of Stock Items" name="sourceId">
                  <Selector defaultValue="Yes">{dummyDeliver}</Selector>
                </Item>
                <p>Yes: List items even if they are OOS No: Do not list OOS items</p>
                <Item label="Don't list until" name="sourceId">
                  <Selector defaultValue="Yes">{dummyDeliver}</Selector>
                </Item>
                <Item label="Listing frequency" name="markup">
                  <Input className="blue-input" type="text" placeholder="0" />
                </Item>
                <p>The system will automatically list an item every X minutes.</p>
                <Item label="Review listings" name="sourceId">
                  <Selector defaultValue="Yes">{dummyDeliver}</Selector>
                </Item>
              </Form>
            </StatusBar>
          </div>

          <div className="table-container">
            <Spreadsheet data={data} onChange={() => setData} columnLabels={lables}  />

            {/*<SimpleTable columns={columns} dataSource={sources} pageSize={10} totalItems={sources?.length} />*/}

            <div className="button-container">
              <Item>
                <ConfirmBtn htmlType="submit">List items</ConfirmBtn>
              </Item>
            </div>
          </div>
        </div>
        <div className="section-sources">
          <h2>Suported suppliers</h2>
          <div className="card-supplier">
            <img alt="sourcelogo"></img>
            <h3>Amazon</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};
