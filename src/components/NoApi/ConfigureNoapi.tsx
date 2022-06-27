import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { getNoApiServers, getManagedServers, updateManagedServers } from 'src/redux/dashboard/noApiServersThunk';
import { ConfirmBtn } from 'src/small-components/ActionBtns';
import '../../sass/no-api/configure-noapi.scss';
import { Channel } from 'src/redux/channels/channelsSlice';
import { Selector, SelectorValue } from 'src/small-components/form/selector';
import { EyeOutlined } from '@ant-design/icons';
import { Input, Alert, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export const ConfigureNoapi = () => {
  const dispatch = useAppDispatch();
  const { channels }: { channels: Channel[] } = useAppSelector((state) => state.channels);
  const { manageServerResult } = useAppSelector((state) => state.managedServers);
  console.log('all the states are', manageServerResult);
  const { noApiServersResult } = useAppSelector((state) => state.noApiServers);
  //Data for backend
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [key, setKey] = useState<string>('');
  const [storePassword, setStorePassword] = useState<string>('');
  const [channelSelected, setChannelSelected] = useState<SelectorValue>(0);
  const newArray =
    [
      {
        'subscriptionId': key,
        'channelOauthId': 601975,
        'password': storePassword,
        'validUntil': '0001-01-01T00:00:00',
        'twoStepSecret': null,
        'loginUsername': null,
        'state': 16777216,
        'noApiServerId': 757123,
        'solutionState': null,
        'solutionData': null,
        'lastUpdated': '2022-06-24T08:46:56.6Z',
        'isoCountry': 2,
        'channelItem': 3,
        'errorRetries': 0
      }
    ];
  console.log(newArray);
  const handleOptionChange = (value: SelectorValue) => {
    setChannelSelected(value);
  };

  useEffect(() => {
    dispatch(getNoApiServers());
    dispatch(getManagedServers());
    dispatch(updateManagedServers(newArray));
  }, [getNoApiServers]);

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

  return (
    <div className="configure-noapi-container">
      <h1>Configure No api server</h1>
      <div className="no-api-servers">
        {noApiServersResult?.length ? (
          <>
            <table>
              <tr>
                <th>Subscription</th>
                <th>Channel</th>
                <th>Username</th>
                <th>Store Password</th>
              </tr>
              <hr />
              <tr>
                <td><h5>NO API Server</h5></td>
                <td>
                  <div>
                    <Selector placeHolder='Select a channel' onChange={handleOptionChange}>
                      {channels?.map(({ name: label, id: value }: Channel) => ({ value, label }))}
                    </Selector>
                  </div>
                </td>
                <td>
                  <div>
                    <Input
                      disabled placeholder={channelSelected === 590881 ? ' teststore ' :
                        channelSelected === 601975 ? 'test_services' : channelSelected === 602219 ? 'teststore' : channelSelected === 602443 ? 'test_amazon' :
                          channelSelected === 603103 ? 'myamazingstore' : channelSelected === 603335 ? 'con-642' : channelSelected === 603688 ? 'Muhima_shop' :
                            channelSelected === 603719 ? 'super_spanish_store' :
                              ' '
                      }
                    />
                  </div>
                </td>
                <td>
                  <div>
                    <Input placeholder={storePassword ? storePassword : '********'}
                      onChange={(e) => { setStorePassword(e.target.value); }}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <p>
                      <EyeOutlined onClick={() => { setShowPassword(!showPassword); }} />
                    </p>
                  </div>
                </td>
              </tr>
            </table>
            {
              channelSelected === 590881 || channelSelected === 602219 || channelSelected === 602443 &&
              <div id="keyform">
                <p>
                  Key (<a href="https://hustlegotreal.com/en/noapiserver-amazonkey/" target='_blank'
                    rel="noreferrer"
                  >Where to get it?</a>)
                </p>
                <div>
                  <Input value={key} onChange={(e) => setKey(e.target.value)}
                  />
                </div>
              </div>
            }
          </>
        ) : (
          noSuscribed
        )}
        {
          channelSelected === 0 &&
          <Alert message={
            <Breadcrumb>
              <p>
                Your accounts name is wrong. You can change it from &nbsp;
              </p>
              <Link to="/channel-configuration" >
                <Breadcrumb.Item>channel-configuration</Breadcrumb.Item>
              </Link>
            </Breadcrumb>
          } type="error" />
        }
        <button>Save changes</button>
      </div>
    </div>
  );
};
