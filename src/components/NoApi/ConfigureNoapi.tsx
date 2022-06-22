import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
/*import { NoApiServer } from 'src/redux/dashboard/noApiServersSlice';*/
import { getNoApiServers } from 'src/redux/dashboard/noApiServersThunk';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import '../../sass/no-api/configure-noapi.scss';
import { Channel } from 'src/redux/channels/channelsSlice';
import { Selector, SelectorValue } from 'src/small-components/form/selector';
import { SimpleTable } from '../../small-components/simple-table';

import { Input } from 'antd';
import { Link } from 'react-router-dom';

export const ConfigureNoapi = () => {
  const dispatch = useAppDispatch();
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);
  const { noApiServersResult } = useAppSelector((state) => state.noApiServers);
  // const [noApiServersPage, setnoApiServersPage] = useState<number>(10);
  const [noApiServersPage] = useState<number>(10);

  const [current, setCurrent] = useState<number>(1);
  const [channelSelected, setChannelSelected] = useState<SelectorValue>(0);
  const handleOptionChange = (value: SelectorValue) => {
    setChannelSelected(value);
  };

  useEffect(() => {
    dispatch(getNoApiServers());
  }, [getNoApiServers]);

  console.log(noApiServersResult);

  const noSuscribed = (
    <div className="nosuscribed-container">
      <div className="nosuscribed">
        <h3>{"Oops it looks like you don't have any no api server contracted."}</h3>
        <p>Do you want to keep your NO API extension running 24/7?</p>
        <p>We can do it for you for only 12.99GBP/month.</p>
        <ConfirmBtn>
          <Link
            to="https://hustlegotreal.com/en/no-api-server/"
            rel="noreferrer"
            target="_blank"
            className="footer-link"
          >
            Read more
          </Link>
        </ConfirmBtn>
      </div>
    </div>
  );

  const columns = [
    {
      title: 'Subscription',
      dataIndex: '',
      key: 'name',
      render: () => {
        return <h4 className="no-api-title">No api server</h4>;
      }
    },
    {
      title: 'Channel',
      dataIndex: '',
      key: '',
      render: () => {
        return (
          <Selector placeHolder="Select a channel" onChange={handleOptionChange}>
            {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
          </Selector>
        );
      }
    },
    {
      title: 'Username',
      dataIndex: '',
      key: '',
      render: () => {
        return <Input name="username" className="blue-input" disabled placeholder={channelSelected === 601975 ? 'yo' : 'no'} />;
      }
    },
    {
      title: 'Store password',
      dataIndex: '',
      key: '',
      render: () => {
        return <Input name="storePasswd" className="blue-input" placeholder="*************" />;
      }
    }
  ];

  return (
    <div className="configure-noapi-container">
      <h1>Configure No api server</h1>
      <div className="no-api-servers">
        {noApiServersResult?.length ? (
          <SimpleTable
            // onPageSizeChanged={setnoApiServersPage}
            currentPage={current}
            onPageChange={setCurrent}
            columns={columns}
            dataSource={noApiServersResult}
            pageSize={noApiServersPage}
          />
        ) : (
          noSuscribed
        )}
      </div>
    </div>
  );
};
