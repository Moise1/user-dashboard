import moment from 'moment';
import React, { useEffect, useState, ReactNode } from 'react';
import { Space, Form, Input, Checkbox, Radio, DatePicker, DatePickerProps, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { AdvancedSearch, AdvancedSearchProps } from './AdvancedSearch';
import { SuccessBtn, TransparentBtn } from './ActionBtns';
import { CatalogProduct } from '../redux/catalog/catalogSlice';
import { getCatalogProductsSearching } from '../redux/catalog/catalogThunk';
import { useAppDispatch, useAppSelector } from '../custom-hooks/reduxCustomHooks';
import { Selector, SelectorValue } from '../small-components/form/selector';
import '../sass/advanced-search.scss';
interface Props extends AdvancedSearchProps {
  openSourceModal?: () => void;
  setAllProducts?: React.Dispatch<React.SetStateAction<CatalogProduct[]>>;
  suppliersCount: number[];
  setAllCatalogProducts?: React.Dispatch<React.SetStateAction<CatalogProduct[]>>;
}

interface catalogInputFieldTypes {
  titleContains: string;
  priceFrom?: number | undefined;
  priceTo?: number | undefined;
  profitFrom?: number | undefined;
  profitTo?: number | undefined;
}

export const CatalogFilters = (props: Props) => {
  const orders = [
    {
      label: 'Default',
      value: '0'
    },
    {
      label: 'Source Price Asc',
      value: '1'
    },
    {
      label: 'Source Price Desc',
      value: '2'
    },
    {
      label: 'Profit Asc',
      value: '3'
    },
    {
      label: 'Profit Desc',
      value: '4'
    },
    {
      label: 'Title Asc',
      value: '5'
    },
    {
      label: 'Title Desc',
      value: '6'
    }
  ];
  const { visible, onClose, openSourceModal, setAllCatalogProducts, suppliersCount } = props;
  const { catalogSearchedProducts } = useAppSelector((state) => state.catalogSearchProduct);
  const [sessionId] = useState<number>(0);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    setAllCatalogProducts?.(catalogSearchedProducts);
  }, [catalogSearchedProducts]);

  const catalogInputIntialTypes: catalogInputFieldTypes = {
    titleContains: ' ',
    priceFrom: undefined,
    priceTo: undefined,
    profitFrom: undefined,
    profitTo: undefined
  };

  const [catalogFormInput, setCatalogFormInput] = useState(catalogInputIntialTypes);
  const catalogAdvancedSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCatalogFormInput({
      ...catalogFormInput,
      [name]: value
    });
  };

  const [order, setOrder] = useState<number>(0);
  const ordersChangeHandler = (value: SelectorValue) => {
    setOrder(Number(value));
  };

  const [options, setOptions] = useState();
  const onOptionsChange = (e: RadioChangeEvent) => {
    setOptions(e.target.value);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { titleContains } = catalogFormInput;
    const { priceFrom } = catalogFormInput;
    const { priceTo } = catalogFormInput;
    const { profitFrom } = catalogFormInput;
    const { profitTo } = catalogFormInput;
    dispatch(
      getCatalogProductsSearching({
        sessionId,
        titleContains,
        priceFrom,
        priceTo,
        profitFrom,
        profitTo,
        options,
        order,
        suppliersCount
      })
    );
    e.preventDefault();
  };

  return (
    <AdvancedSearch
      title="Search Criteria"
      placement="right"
      onClose={onClose}
      visible={visible}
      extra={
        <Space>
          <Button className="clear-filters" onClick={onClose}>
            Close filters
          </Button>
        </Space>
      }
    >
      <div className="catalog advanced-form-container">
        <h5>
          <strong>Choose your suppliers</strong>
        </h5>
        <Button className="supplier-one" onClick={openSourceModal}>
          {suppliersCount.length} suppliers
        </Button>
        <Form
          form={form}
          layout="vertical"
          className="advanced-search-form"
          name="control-hooks"
          id="catalog"
          onFinish={handleFilterSubmit}
          initialValues={{
            remember: true
          }}
        >
          <div className="catalog-filters-inputs">
            <Form.Item label="Min source price" name="priceFrom">
              <Input
                className="blue-input"
                name="priceFrom"
                value={catalogFormInput.priceFrom}
                onChange={catalogAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Min Profit" name="profitFrom">
              <Input
                className="blue-input"
                name="profitFrom"
                onChange={catalogAdvancedSearchOnChange}
                value={catalogFormInput.profitFrom}
              />
            </Form.Item>

            <Form.Item label="Max source price" name="priceTo">
              <Input
                className="blue-input"
                name="priceTo"
                onChange={catalogAdvancedSearchOnChange}
                value={catalogFormInput.priceTo}
              />
            </Form.Item>

            <Form.Item label="Max Profit" name="profitTo">
              <Input
                className="blue-input"
                name="profitTo"
                onChange={catalogAdvancedSearchOnChange}
                value={catalogFormInput.profitTo}
              />
            </Form.Item>
          </div>

          <div className="prime-options">
            <p className="amazon-prime">
              <strong>Amazon Prime</strong>
            </p>
            <div className="checkboxes">
              <Form.Item name="amazonPrime">
                <Radio.Group onChange={onOptionsChange} value={options} name="amazonPrime">
                  <Radio value={0}>Only Prime</Radio>
                  <Radio value={1}>All Items</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>

          <Form.Item label="Title" name="titleContains">
            <Input
              className="blue-input"
              name="titleContains"
              value={catalogFormInput.titleContains}
              onChange={catalogAdvancedSearchOnChange}
            />
          </Form.Item>
          <Form.Item label="Order By" name="orderBy">
            <Selector
              size="large"
              onChange={ordersChangeHandler}
              placeHolder="Default"
              dropdownRender={(menu: ReactNode) => <div className="dropdown-content mb-5">{menu}</div>}
            >
              {orders.map((x) => {
                return { value: x.value, label: x.label };
              })}
            </Selector>
          </Form.Item>

          <div className="action-btns">
            <TransparentBtn handleClick={onReset} htmlType="button">
              Clear filters
            </TransparentBtn>
            <SuccessBtn htmlType="submit"> Apply filters</SuccessBtn>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};

export const ListingsAdvancedSearch = (props: AdvancedSearchProps) => {
  const { Search } = Input;
  const { visible, onClose, closable, setSearchTxt } = props;
  const handleDateChange: DatePickerProps['onChange'] = (date) => {
    const dateValue = moment(date).format('YYYY-MM-DD');
    setSearchTxt!(dateValue);
  };
  return (
    <AdvancedSearch
      className="listings-advanced-search"
      title="Advanced Search"
      placement="right"
      onClose={onClose}
      visible={visible}
      closable={closable}
    >
      <div className="listings advanced-form-container">
        <Form layout="vertical" className="advanced-search-form">
          <div className="listings-search-inputs">
            <Form.Item label="Asin">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Sku">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Cost Price">
              <div className="cost-price-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />
              </div>
            </Form.Item>

            <Form.Item label="Source">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Title">
              <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} />
            </Form.Item>

            <Form.Item label="Sell Price">
              <div className="sell-price-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />
              </div>
            </Form.Item>
          </div>

          <div className="check-boxes">
            <Form.Item className="monitor-price-options" label="Monitor Price">
              <Checkbox checked className="checkbox">
                Yes
              </Checkbox>
              <Checkbox className="checkbox">No</Checkbox>
            </Form.Item>

            <Form.Item className="price-decrease-options" label="Price Decrease">
              <Checkbox className="checkbox">Yes</Checkbox>
              <Checkbox className="checkbox">No</Checkbox>
            </Form.Item>
          </div>

          <div className="extra-options">
            <Form.Item label="Quantiy">
              <div className="quantiy-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />
              </div>
            </Form.Item>

            <Form.Item label="Out of stock days">
              <div className="out-of-stock-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />{' '}
              </div>
            </Form.Item>

            <Form.Item label="Created On">
              <DatePicker className="date-picker" onChange={handleDateChange} />
            </Form.Item>

            <Form.Item label="Created by">
              <Search onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Contains..." />
            </Form.Item>

            <Form.Item label="Unsold days">
              <div className="unsold-days-section">
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Min" />
                <Search className="" onChange={(e) => setSearchTxt!(e.target.value)} placeholder="Max" />{' '}
              </div>
            </Form.Item>

            <Form.Item label="Ignore Rules">
              <Checkbox className="checkbox">Yes</Checkbox>
              <Checkbox className="checkbox">No</Checkbox>
            </Form.Item>
          </div>
        </Form>
      </div>
    </AdvancedSearch>
  );
};
