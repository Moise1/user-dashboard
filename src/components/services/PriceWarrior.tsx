import { Form } from 'antd';
import '../../sass/services/service.scss';
import { Selector } from 'src/small-components/form/selector';
import { useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import '../../sass/services/price-warrior-configuration.scss';
import { SimpleTable } from 'src/small-components/simple-table';
import { ConfirmBtn } from 'src/small-components/ActionBtns';

const { Item } = Form;

export const PriceWarrior = () => {
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);

  const columns = [
    {
      title: 'Listing',
      dataIndex: 'Listing',
      key: 'Listing',
      render: () => {
        return <p className=" ">23231 - Ottolenghi FLAVOUR</p>;
      }
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      key: 'Price',
      render: () => {
        return <p className=" ">19.99</p>;
      }
    },
    {
      title: 'Item Copied',
      dataIndex: 'ItemCopied',
      key: 'ItemCopied',
      render: () => {
        return <p className=" ">24.42</p>;
      }
    },
    {
      title: 'Source Price',
      dataIndex: 'SourcePrice',
      key: 'SourcePrice',
      render: () => {
        return <p className=" ">15</p>;
      }
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: () => {
        return <p className=" ">TOP 1</p>;
      }
    },
    {
      title: 'Sold',
      dataIndex: 'Sold',
      key: 'Sold',
      render: () => {
        return <p className=" ">0</p>;
      }
    },
    {
      title: 'Checked',
      dataIndex: 'Checked',
      key: 'Checked',
      render: () => {
        return <p className=" ">2022-06-23 16:00</p>;
      }
    },
    {
      title: 'Price Updated',
      dataIndex: 'PriceUpdated',
      key: 'PriceUpdated',
      render: () => {
        return <p className=" ">2022-06-23 16:00</p>;
      }
    }
  ];

  return (
    <div className="price-warrior-container">
      <h2>Price Warrior configuration</h2>
      <div className="options-container">
        <Form className="options-form" layout={'vertical'}>
          <Item className="form-item" label="Price Warrior">
            <p>If enabled, your store will be monitored every day to protect your listings.</p>
            <Selector placeHolder="Enabled">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item className="form-item" label="Repricing">
            <p>If enabled, it will automatically update the price to beat the competitor.</p>
            <Selector placeHolder="Enabled">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item className="form-item" label="Minimum Markup (%)">
            <p>Minimum % to apply to the supplier{"'"}s price. Price Warrior will not sell below this value.</p>
            <Selector placeHolder="25">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item className="form-item" label="Undercut by">
            <p>How much Price Warrior can undercut your competitors every time they beat your price.</p>
            <Selector placeHolder="0.30">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item className="form-item" label="Treshold">
            <p>Number of changes allowed to consider both titles the same. Min: 0 (Exact Title), Max: 20.</p>
            <Selector placeHolder="2">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
        </Form>
        <ConfirmBtn>Save configuration</ConfirmBtn>
      </div>
      <div className="table-container">
        <SimpleTable columns={columns} dataSource={columns} />
      </div>
    </div>
  );
};
