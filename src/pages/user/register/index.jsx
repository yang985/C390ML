import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import { Link, useRequest, history,SelectLang } from 'umi';
import { registerHandler } from './service';
import Footer from '@/components/Footer';
import styles from './style.less';
import { request } from 'umi';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
// const passwordStatusMap = {
//   ok: (
//     <div className={styles.success}>
//       <span>强度：强</span>
//     </div>
//   ),
//   pass: (
//     <div className={styles.warning}>
//       <span>强度：中</span>
//     </div>
//   ),
//   poor: (
//     <div className={styles.error}>
//       <span>强度：太短</span>
//     </div>
//   ),
// };
const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};

const Register = () => {
  const [submitting , setSubmitting] = useState(false)
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [popover, setPopover] = useState(false);
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');

    if (value && value.length > 9) {
      return 'ok';
    }

    if (value && value.length > 5) {
      return 'pass';
    }

    return 'poor';
  };

  // const { loading: submitting, run: register } = useRequest(registerHandler, {
  //   manual: true,
  //   onSuccess: (data, params) => {
  //     if (data.status === 'ok') {
  //       message.success('Successfully registered！');
  //       history.push({
  //         pathname: '/user/login',
  //         state: {
  //           account: params.email,
  //         },
  //       });
  //     }else{
  //       console.log(data.status)
  //     }
  //   },
  //   onerror:(data,params)=>{

  //   }
  // });

  const register = (values) =>{
    request('/users/register/', {
      method: 'POST',
      data: values,
    }).then((result)=>{
      if (result.status === 'ok'){
        message.success(result.message,3)
        history.push('/user/login')
      }else{
        message.error(result.message)
      }
    })
  }

  const onFinish = (values) => {
    register(values);
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('The passwords entered twice do not match !');
    }

    return promise.resolve();
  };

  const checkPassword = (_, value) => {
    const promise = Promise; // 没有值的情况

    if (!value) {
      setVisible(!!value);
      return promise.reject('Please type in password !');
    } // 有值的情况

    if (!visible) {
      setVisible(!!value);
    }

    setPopover(!popover);

    if (value.length < 6) {
      return promise.reject('');
    }

    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }

    return promise.resolve();
  };

  const changePrefix = (value) => {
    setPrefix(value);
  };

  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          className={styles.progress}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>

        <div className={styles.main}>
          <h3>Register</h3>
          <Form form={form} name="UserRegister" onFinish={onFinish}>
          <FormItem
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please type in username!',
                },
                // {
                //   type: 'email',
                //   message: ' format error!',
                // },
              ]}
            >
              <Input size="large" placeholder="Username" />
            </FormItem>
            <FormItem
              name="mail"
              rules={[
                {
                  required: true,
                  message: 'Please type in email address!',
                },
                {
                  type: 'email',
                  message: 'Email address format error!',
                },
              ]}
            >
              <Input size="large" placeholder="email" />
            </FormItem>
            {/* <Popover
              getPopupContainer={(node) => {
                if (node && node.parentNode) {
                  return node.parentNode;
                }

                return node;
              }}
              content={
                visible && (
                  <div
                    style={{
                      padding: '4px 0',
                    }}
                  >
                    {passwordStatusMap[getPasswordStatus()]}
                    {renderPasswordProgress()}
                    <div
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                    </div>
                  </div>
                )
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              visible={visible}
            > */}
              <FormItem
                name="password"
                className={
                  form.getFieldValue('password') &&
                  form.getFieldValue('password').length > 0 &&
                  styles.password
                }
                rules={[
                  {
                    validator: checkPassword,
                  },
                ]}
              >
                <Input size="large" type="password" placeholder="password with at least 6 digits (case sensitive)" />
              </FormItem>
            {/* </Popover> */}
            <FormItem
              name="confirm"
              rules={[
                {
                  required: true,
                  message: 'confirm password',
                },
                {
                  validator: checkConfirm,
                },
              ]}
            >
              <Input size="large" type="password" placeholder="comfirm password" />
            </FormItem>
            {/* <InputGroup compact>
              <Select
                size="large"
                value={prefix}
                onChange={changePrefix}
                style={{
                  width: '20%',
                }}
              >
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
              </Select>
              <FormItem
                style={{
                  width: '80%',
                }}
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号!',
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: '手机号格式错误!',
                  },
                ]}
              >
                <Input size="large" placeholder="手机号" />
              </FormItem>
            </InputGroup> */}
            {/* <Row gutter={8}>
              <Col span={16}>
                <FormItem
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="验证码" />
                </FormItem>
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row> */}
            <FormItem>
              <Button
                size="large"
                loading={submitting}
                className={styles.submit}
                type="primary"
                htmlType="submit"
              >
                <span>Submit</span>
              </Button>
              <Link className={styles.login} to="/user/login">
                <span>Use exist account</span>
              </Link>
            </FormItem>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
