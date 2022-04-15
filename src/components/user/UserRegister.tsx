import { Form, Input, Checkbox } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { ConfirmBtn } from '../../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { userRegister } from 'src/redux/user/userThunk';
import { UserData } from '../../redux/user/userSlice';
import '../../sass/user-register.scss';

export const UserRegister = withRouter(({ history }) => {
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const onFinish = (values: UserData) => {
    dispatch(userRegister({ data: values, history }));
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Register</h2>
      <Form
        className="register-form"
        layout="vertical"
        name="basic"
        initialValues={{ terms: false }}
        onFinish={onFinish}
        autoComplete="on"
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

        <Form.Item name="terms" valuePropName="checked" wrapperCol={{ offset: 5, span: 18 }}>
          <Checkbox className="checkbox">
            I accept the{' '}
            <span>
              <a href="#">Terms</a> and <a href="#">Conditions</a>
            </span>
          </Checkbox>
        </Form.Item>

        <Form.Item name="offers" valuePropName="checked" wrapperCol={{ offset: 5, span: 18 }}>
          <Checkbox className="checkbox">I would like to receive offers and promotions</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <ConfirmBtn htmlType="submit" disabled={loading}>
            {loading ? 'Please wait...' : 'Create account'}
          </ConfirmBtn>
        </Form.Item>
      </Form>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        Already have an account?{' '}
        <span>
          {' '}
          <Link to="/login" className="alternative-link">
            Sign In.
          </Link>
        </span>
      </Form.Item>
    </div>
  );
});
