import { Checkbox, Form, Input } from 'antd';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { userLogin } from 'src/redux/user/userThunk';
import { UserData } from '../../redux/user/userSlice';
import logo from '../../assets/logoHGR.png';
import '../../sass/user-login.scss';

export const UserLogin = withRouter(({ history }: {history: RouteComponentProps['history']}) => {
  const { userLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const onFinish = (values: UserData) => {
    dispatch(userLogin({ data: values, history }));
  };

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <div className="text-section">
          <h2 className="login-form-title">Login</h2>
          <p>
            Don&apos;t have account yet?{' '}
            <Link className="alternative-link" to="/signup">
              Sign Up
            </Link>
          </p>
        </div>
        <div>
          <img src={logo} alt="" className="login-logo" />
        </div>
      </div>
      <Form
        className="login-form"
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          label="Email address"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid e-mail address' }
          ]}
        >
          <Input autoFocus={true} className="auth-input" />
        </Form.Item>

        <Form.Item
          label={ (
            <div className="password-input-label">
              <span className="label-name">Password</span>
              <Link to="/reset-password" className='alternative-link'>Forgot your password?</Link>
            </div>
          )}
          name="password"
          rules={[{ required: true, message: 'Please provide your password!' }]}
        >
          <Input.Password className="auth-input" />
        </Form.Item>
        <Form.Item className="alternative">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <ConfirmBtn htmlType="submit" disabled={userLoading}>
            {userLoading ? 'Please wait...' : 'Log In'}
          </ConfirmBtn>
        </Form.Item>
      </Form>
    </div>
  );
});
