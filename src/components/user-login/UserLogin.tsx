import { Form, Input, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { ConfirmBtn } from '../small-components/ActionBtns';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { userLogin } from 'src/redux/user-auth/userAuthThunk';
import { User } from '../../redux/user-auth/userAuthSlice';
import '../../sass/light-theme/user-login.scss';

export const UserLogin = withRouter(({history}) =>{
  const {loading} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const onFinish = (values: User) => {
    dispatch(userLogin({data: values, history}));
  };
  
  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <Form 
        className='login-form'
        layout="vertical" 
        name="basic" 
        initialValues={{ remember: true }} 
        onFinish={onFinish} 
        autoComplete="on"
      >
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
  
        <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <ConfirmBtn htmlType="submit" disabled={loading}>{loading ? 'Please wait...': 'Log In'}</ConfirmBtn>
        </Form.Item>
      </Form>
    </div>
  );
});