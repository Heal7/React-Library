import { connect } from 'dva';
import { Form, Icon, Input, Button, Card } from 'antd';
import constants from '../../utils/constants';
import style from './LoginForm.css';
const FormItem = Form.Item;

const LoginForm = ({
    dispatch,
    loginname,
    password,
    loading,
    status,
    form
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:constants.NAMESPACE.LoginPage+"/validate",
          payload:values
        });
      }
    });
  }

  const { getFieldDecorator } = form;
  return (
    <Card title="用户登录" extra={<a href="#">忘记密码？</a>} className={style.loginForm}>
      <Form onSubmit={handleSubmit} >
        <FormItem hasFeedback>
          {
            getFieldDecorator('loginname', {
              rules: [{ required: true, message: '请输入用户名!' }],
              initialValue:loginname
            })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )
          }
        </FormItem>
        <FormItem hasFeedback>
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
              initialValue:password
            })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )
          }
        </FormItem>
        <Button type="primary" htmlType="submit" loading={loading} className={style.loginFormButton}>{status}</Button>
      </Form>
    </Card>
  );
}

export default connect()(LoginForm);