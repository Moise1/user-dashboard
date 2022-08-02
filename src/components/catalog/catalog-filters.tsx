import { Button, Drawer, Form, Input, Radio, RadioChangeEvent, Space } from 'antd';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { CatalogProduct } from '../../redux/catalog/catalogSlice';
import { getCatalogProductsSearching } from '../../redux/catalog/catalogThunk';
import { SuccessBtn, TransparentBtn } from '../../small-components/ActionBtns';
import { Selector, SelectorValue } from '../../small-components/form/selector';

interface catalogInputFieldTypes {
  titleContains: string;
  priceFrom?: number | undefined;
  priceTo?: number | undefined;
  profitFrom?: number | undefined;
  profitTo?: number | undefined;
}
type DrawerPlacement = 'right' | 'top' | 'left' | 'bottom';
interface Props {
  visible?: boolean;
  closable?: boolean;
  placement?: DrawerPlacement;
  onClose?: () => void;
  title?: string;
  children?: JSX.Element | JSX.Element[];
  extra?: ReactNode;
  width?: number | string;
  className?: string;
  setSearchTxt?: Dispatch<SetStateAction<string | null>>;
  openSourceModal?: () => void;
  setAllProducts?: React.Dispatch<React.SetStateAction<CatalogProduct[]>>;
  suppliersCount: number[];
  setAllCatalogProducts?: React.Dispatch<React.SetStateAction<CatalogProduct[]>>;
  setSourcesIds?: React.Dispatch<React.SetStateAction<number[]>>
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
  const { visible, onClose, openSourceModal, setAllCatalogProducts, suppliersCount, setSourcesIds } = props;
  const { catalogSearchedProducts } = useAppSelector((state) => state.catalogSearchProduct);
  const [sessionId] = useState<number>(0);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const catalogInputIntialTypes: catalogInputFieldTypes = {
    titleContains: ' ',
    priceFrom: undefined,
    priceTo: undefined,
    profitFrom: undefined,
    profitTo: undefined
  };

  const [catalogFormInput, setCatalogFormInput] = useState(catalogInputIntialTypes);

  const onReset = () => {
    form.resetFields();
    setCatalogFormInput(catalogInputIntialTypes);
    setSourcesIds?.([]);
  };

  useEffect(() => {
    setAllCatalogProducts?.(catalogSearchedProducts);
  }, [catalogSearchedProducts]);


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
    <Drawer
      className="advanced-search"
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
      <div className="advanced-form-container">
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
          <div className="search-inputs">
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
                value={catalogFormInput.profitFrom}
                onChange={catalogAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Max source price" name="priceTo">
              <Input
                className="blue-input"
                name="priceTo"
                value={catalogFormInput.priceTo}
                onChange={catalogAdvancedSearchOnChange}
              />
            </Form.Item>

            <Form.Item label="Max Profit" name="profitTo">
              <Input
                className="blue-input"
                name="profitTo"
                value={catalogFormInput.profitTo}
                onChange={catalogAdvancedSearchOnChange}
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
              placeHolder="Default"
              onChange={ordersChangeHandler}
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
    </Drawer>
  );
};
