import { Form, Input, Checkbox, Steps } from 'antd';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { userRegister } from 'src/redux/user/userThunk';
import { UserData } from '../../redux/user/userSlice';
import logo from '../../assets/hgr-logo.png';
import '../../sass/user-register.scss';

export const UserRegister = withRouter(({ history }: { history: RouteComponentProps['history'] }) => {
  const { Step } = Steps;
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const onFinish = (values: UserData) => {
    dispatch(userRegister({ data: values, history }));
  };

  return (
    <div className="register-main-container">
      <div className="register-form-container">
        <div className="register-form-header">
          <div className="text-section">
            <h2 className="register-form-title">Register</h2>
            <p>
              Already have account?{' '}
              <Link className="alternative-link" to="/login">
                Log In
              </Link>
            </p>
          </div>
          <div>
            <img src={logo} alt="" className="logo" />
          </div>
        </div>
        <Form
          className="register-form"
          layout="vertical"
          name="basic"
          initialValues={{ terms: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input className="auth-input" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please provide your email!' },
              { type: 'email', message: 'Invalid e-mail address' }
            ]}
          >
            <Input className="auth-input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please provide your password!' }]}
          >
            <Input.Password className="auth-input" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password className="auth-input" />
          </Form.Item>

          <Form.Item name="terms" valuePropName="checked">
            <Checkbox className="checkbox">
              I accept the{' '}
              <span>
                <a href="#">Terms</a> and <a href="#">Conditions</a>
              </span>
            </Checkbox>
          </Form.Item>

          <Form.Item name="offers" valuePropName="checked">
            <Checkbox className="checkbox">I would like to receive offers and promotions</Checkbox>
          </Form.Item>

          <Form.Item>
            <ConfirmBtn htmlType="submit" disabled={loading}>
              {loading ? 'Please wait...' : 'Register'}
            </ConfirmBtn>
          </Form.Item>
        </Form>
      </div>
      <div className="sell-online-container">
        <div className="sell-online-contents">
          <div className="title">
            <h1>Sell Online</h1>
            <p>without stock</p>

            <div className="stats">
              <Steps progressDot current={0}  direction="vertical">
                <Step title="Over 150 suppliers"  />
                <Step title="5 countries supported" />
                <Step title="Other feature" />
                <Step title="Other feature" />
              </Steps>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
