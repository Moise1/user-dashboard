import { Form } from 'antd';
import '../../sass/services/service.scss';
import { Selector } from 'src/small-components/form/selector';
import { useAppSelector } from 'src/custom-hooks/reduxCustomHooks';
import { Channel } from 'src/redux/channels/channelsSlice';
import '../../sass/services/price-warrior-configuration.scss';

const { Item } = Form;

export const PriceWarrior = () => {
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);

  return (
    <div className="price-warrior-container">
      <div className="options-container">
        <Form className="options-form" layout={'vertical'}>
          <Item label="Price Warrior">
            <Selector placeHolder="Select a channel">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item label="Repricing">
            <Selector placeHolder="Select a channel">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item label="Minimum Markup (%)">
            <Selector placeHolder="Select a channel">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item label="Undercut by">
            <Selector placeHolder="Select a channel">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
          <Item label="Treshold">
            <Selector placeHolder="Select a channel">
              {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
            </Selector>
          </Item>
        </Form>
      </div>
    </div>
  );
};
