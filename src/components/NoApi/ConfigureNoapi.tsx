import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
/*import { NoApiServer } from 'src/redux/dashboard/noApiServersSlice';*/
import { getNoApiServers } from 'src/redux/dashboard/noApiServersThunk';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import '../../sass/no-api/configure-noapi.scss';
import { Channel } from 'src/redux/channels/channelsSlice';

import { Selector } from 'src/small-components/form/selector';
import { SimpleTable } from '../tables/SimpleTable';

import { Input } from 'antd';

export const ConfigureNoapi = () => {
  const dispatch = useAppDispatch();
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);
  const { noApiServersResult } = useAppSelector((state) => state.noApiServers);
  const [noApiServersPage, setnoApiServersPage] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    dispatch(getNoApiServers());
  }, [getNoApiServers]);

  console.log(noApiServersResult);

  const noApiServerSubscription = (
    <div className="subscribe">
      <p>Do you want to keep your NO API extension running 24/7?</p>
      <p>We can do it for you for only 12.99GBP/month.</p>
      <ConfirmBtn>Read more</ConfirmBtn>
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
          <Selector placeHolder="Select a channel">
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
        return <Input name="username" className="blue-input" placeholder="Your store username" />;
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
            setSourcesPerPage={setnoApiServersPage}
            current={current}
            onChange={setCurrent}
            columns={columns}
            dataSource={noApiServersResult}
            pageSize={noApiServersPage}
            totalItems={noApiServersResult?.length}
          />
        ) : (
          noApiServerSubscription
        )}
      </div>
    </div>
  );
};
