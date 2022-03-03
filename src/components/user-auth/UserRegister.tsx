import { Form, Input, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { ConfirmBtn } from '../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { userRegister } from 'src/redux/user-auth/userAuthThunk';
import { User } from '../../redux/user-auth/userAuthSlice';
import '../../sass/user-register.scss';

export const UserRegister = withRouter(({ history, location }) => {
  const { loading } = useAppSelector((state) => state.auth);
  console.log('ROUTE PROPS', location);
  const dispatch = useAppDispatch();
  const onFinish = (values: User) => {
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
          <Input className="blue-input" />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input className="blue-input" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className="blue-input" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password className="blue-input" />
        </Form.Item>

        <Form.Item name="terms" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Agree to Terms and Conditions</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <ConfirmBtn htmlType="submit" disabled={loading}>
            {loading ? 'Please wait...' : 'Register'}
          </ConfirmBtn>
        </Form.Item>
      </Form>
    </div>
  );
});
