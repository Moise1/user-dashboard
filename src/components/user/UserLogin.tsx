import { Form, Input } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { userLogin } from 'src/redux/user/userThunk';
import { UserData } from '../../redux/user/userSlice';
import '../../sass/user-login.scss';

export const UserLogin = withRouter(({ history }) => {
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const onFinish = (values: UserData) => {
    dispatch(userLogin({ data: values, history }));
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <Form
        className="login-form"
        layout="vertical"
        name="basic"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid e-mail address' }
          ]}
        >
          <Input className="auth-input" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className="auth-input" />
        </Form.Item>

        <Form.Item className="alternative" wrapperCol={{ offset: 6, span: 14 }}>
          No account?{' '}
          <span>
            {' '}
            <Link to="/register" className="alternative-link">
              Create one here.
            </Link>
          </span>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <ConfirmBtn htmlType="submit" disabled={loading}>
            {loading ? 'Please wait...' : 'Log In'}
          </ConfirmBtn>
        </Form.Item>
      </Form>
    </div>
  );
});
