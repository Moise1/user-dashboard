import { Form, Spin } from 'antd';
import '../../sass/services/service.scss';
import { Selector, SelectorValue } from 'src/small-components/form/selector';
import '../../sass/services/price-warrior-configuration.scss';
import { SimpleTable } from 'src/small-components/tables/simple-table';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import Input from 'antd/es/input/Input';
import React, { useEffect, useState } from 'react';
import { getPriceWarrior, UpdateSettings } from '../../redux/price-warrior/PriceWarriorThunk';
import { PWListing, PWSetting } from '../../redux/price-warrior/priceWarriorSlice';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';

const { Item } = Form;

export const PriceWarrior = () => {
  const { priceWarrior, loading } = useAppSelector((state) => state.priceWarrior);
  const dispatch = useAppDispatch();
  const [active] = useState<string>(priceWarrior?.settings?.active?.toString());
  const [repricing] = useState<string>(priceWarrior?.settings?.repricing?.toString());
  const [minMarkup] = useState<number>(priceWarrior?.settings?.markup);
  const [undercutBy] = useState<number>(priceWarrior?.settings?.undercutBy);
  const [threshold] = useState<number>(priceWarrior?.settings?.threshold);
  const [data, setData] = useState<PWSetting>({ active: active as unknown as boolean, repricing: repricing as unknown as boolean, markup: minMarkup, threshold: threshold, undercutBy: undercutBy });


  const onPriceWarriorChange = (value: SelectorValue) => {
    setData(prev => ({ ...prev, active: value as unknown as boolean }));
  };

  const onRepricingChange = (value: SelectorValue) => {
    setData(prev => ({ ...prev, repricing: value as unknown as boolean }));
  };

  const onMinMarkupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, markup: e.target.value as unknown as number }));
  };

  const onUndercutByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, undercutBy: e.target.value as unknown as number }));
  };

  const onThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(prev => ({ ...prev, thre: e.target.value as unknown as number }));
  };

  const onSave = () => {
    const rs = dispatch(UpdateSettings(data));
    console.log(rs);
    dispatch(getPriceWarrior);
  };

  const noPWService = (<div className="price-warrior-container">
    <h4> Currently!You don&apos;t have any price warrior service to configure.</h4>
  </div>
  );
  const columns = [
    {
      title: 'Listing',
      dataIndex: 'title',
      key: 'id',
      render: (_: string, record: PWListing) => {
        return <p className=" "><strong>{record.ebayItemId}</strong> - {record.title}</p>;
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_: number, record: PWListing) => {
        return <p className=" "><a href={record.ebayUrl} rel="noreferrer" target="_blank">{record.price}</a></p>;
      }
    },
    {
      title: 'Item Copied',
      dataIndex: 'competitorPrice',
      key: 'competitorPrice',
      render: (_: number, record: PWListing) => {
        return <p className=' '><a href={record.competitorItemUrl} rel='noreferrer' target='_blank'>{record.competitorPrice == 0 ? '' : record.competitorPrice.toString()}</a></p>;
      }
    },
    {
      title: 'Source Price',
      dataIndex: 'sourcePrice',
      key: 'sourcePrice',
    },
    {
      title: 'Status',
      dataIndex: 'lost',
      key: 'lost',
      render: (_: boolean, record: PWListing) => {
        return <p className=" ">{record.lost ? (<img src="~/images/lost.png" width="24" height="24" title="We can't beat that price!" />) :
          (<img src="~/images/won.png" width="24" height="24" title="Your price is better than your competitor's" />)}</p>;
      }
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
      key: 'sold'
    },
    {
      title: 'Checked',
      dataIndex: 'updated',
      key: 'updated',
      render: (_: string, record: PWListing) => {
        return <p className=" ">{record.updated?.toLocaleString()}</p>;
      }
    },
    {
      title: 'Price Updated',
      dataIndex: 'priceUpdated',
      key: 'priceUpdated',
      render: (_: string, record: PWListing) => {
        return <p className=" ">{record.priceLastUpdated?.toLocaleString()}</p>;
      }
    }
  ];

  const genericOptions = [
    { value: 'true', label: 'Enabled' },
    { value: 'false', label: 'Disabled' }
  ];

  useEffect(() => {
    dispatch(getPriceWarrior());
  }, [getPriceWarrior]);

  return loading ? (
    <Spin />
  ) : (priceWarrior ? (
    priceWarrior.listings ? (
      <div className="price-warrior-container">
        <h2>Price Warrior configuration</h2>
        <div className="options-container">
          <Form className="options-form" layout={'vertical'}>
            <Item className="form-item" label="Price Warrior">
              <p>If enabled, your store will be monitored every day to protect your listings.</p>
              <Selector placeHolder="Enabled" defaultValue={active} onChange={onPriceWarriorChange}>
                {genericOptions}
              </Selector>
            </Item>
            <Item className="form-item" label="Repricing">
              <p>If enabled, it will automatically update the price to beat the competitor.</p>
              <Selector placeHolder="Enabled" defaultValue={repricing} onChange={onRepricingChange}>
                {genericOptions}
              </Selector>
            </Item>
            <Item className="form-item" label="Minimum Markup (%)">
              <p>Minimum % to apply to the supplier{"'"}s price. Price Warrior will not sell below this value.</p>
              <Input placeholder="Min" type="number" defaultValue={minMarkup} onChange={(e) => onMinMarkupChange(e)} className="blue-input" />
            </Item>
            <Item className="form-item" label="Undercut by">
              <p>How much Price Warrior can undercut your competitors every time they beat your price.</p>
              <Input placeholder="Min" type="number" defaultValue={undercutBy} onChange={(e) => onUndercutByChange(e)} className="blue-input" />
            </Item>
            <Item className="form-item" label="Threshold">
              <p>Number of changes allowed to consider both titles the same. Min: 0 (Exact Title), Max: 20.</p>
              <Input placeholder="Min" min={5} max={20} type="number" defaultValue={threshold} onChange={(e) => onThresholdChange(e)} className="blue-input" />
            </Item>
          </Form>
          <div onClick={onSave}><ConfirmBtn>Save configuration</ConfirmBtn></div>
        </div>
        <div className="table-container">
          <SimpleTable columns={columns} dataSource={priceWarrior.listings} />
        </div>
      </div>) : noPWService) :
    noPWService
  );
};
