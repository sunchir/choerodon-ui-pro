import { message, Tabs, Row, Col } from 'choerodon-ui';
import { Form, TextField, Password, DataSet, Button, CheckBox } from 'choerodon-ui/pro';
import React, { useMemo } from 'react';
import { Link, history, FormattedMessage, SelectLang } from 'umi';
import Footer from '@/components/Footer';
import { getFakeCaptcha, LoginParamsType } from '@/services/login';
import { LabelLayout } from 'choerodon-ui/pro/lib/form/enum';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import { ButtonType, FuncType, ButtonColor } from 'choerodon-ui/pro/lib/button/interface';
import useThemeHelper from '@hzero-front-ui/cfg/lib/components/Container/useThemeHelper';
import { defaultConfig } from '@hzero-front-ui/cfg/lib/utils/config';
import { ThemeSchema } from '@hzero-front-ui/cfg/lib/utils';
import AliPayIcon from '@/assets/login/Alipay';
import Wechat from '@/assets/login/wechat';
import Taobao from '@/assets/login/Taobao';

import styles from './index.less';

const { TabPane } = Tabs;

export const schemaMap = ['theme1', 'theme2', 'theme3', 'theme4'];

function readOriginLocalTheme() {
  const configStr = localStorage.getItem('themeConfig');
  if (configStr && configStr !== 'undefined') {
    // 之所以要判断是不是undefined，是因为往本地存储的时候如果传的值不能被格式化，就会变成undefined字符串
    const configObj = JSON.parse(configStr);
    return configObj || {};
  }
  return {};
}

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const goto = () => {
  const { query } = history.location;
  const { redirect } = query as { redirect: string };
  window.location.href = redirect || '/';
};

const Login: React.FC<{}> = () => {
  const { setLocalTheme } = useThemeHelper();
  const localTheme = readOriginLocalTheme();
  const schemaCurrent = (localTheme[schemaMap[3]] || {}).current;
  const conf = {
    current: {
      ...(schemaCurrent || defaultConfig),
      schema: schemaMap[3],
    },
    active: schemaMap[3] as ThemeSchema,
    prev: {},
  };
  setLocalTheme(conf);
  const haneleSuccess = async (values: LoginParamsType) => {
    try {
      if (values.success === true) {
        message.success('登录成功！');
        goto();
        return;
      }
    } catch (error) {
      message.error('登录失败，请重试！');
    }
  };

  const nameLoginDS = useMemo(() => {
    return new DataSet({
      id: 'login',
      submitUrl: '/api/login/account',
      fields: [
        {
          name: 'userName', // 字段名
          type: 'string' as FieldType, // 字段类型, 决定以什么组件进行渲染
          label: '用户名称', // 字段标签 可以在form或者table上生成对应的label
          required: true,
        },
        {
          name: 'userPassword',
          type: 'string' as FieldType,
          label: '用户密码',
          required: true,
        },
        {
          name: 'type',
          type: 'string' as FieldType,
          defaultValue: 'account',
        },
      ],
    });
  }, []);

  const captchaDS = useMemo(() => {
    return new DataSet({
      id: 'captcha',
      submitUrl: '/api/login/account',
      fields: [
        {
          name: 'phoneNumber', // 字段名
          type: 'string' as FieldType, // 字段类型, 决定以什么组件进行渲染
          label: '手机号码', // 字段标签 可以在form或者table上生成对应的label
          required: true,
        },
        {
          name: 'phoneCaptcha',
          type: 'number' as FieldType,
          label: '验证码',
          required: true,
        },
        {
          name: 'type',
          type: 'string' as FieldType,
          defaultValue: 'mobile',
        },
      ],
    });
  }, []);

  const captchaButton = (
    <Button
      funcType={'flat' as FuncType}
      onClick={async () => {
        if (captchaDS.current && captchaDS.current.get('phoneNumber')) {
          const result = await getFakeCaptcha(captchaDS.current.get('phoneNumber'));
          if (result === false) {
            return;
          }
          message.success('获取验证码成功！验证码为：1234');
        } else {
          message.error('请输入手机号码');
        }
      }}
    >
      获取验证码
    </Button>
  );

  return (
      <div className={styles.container}>
        <Row className={styles.row}>
          <Col className={styles.description} xs={2} sm={4} md={6} lg={12} xl={12}>
            <img className={styles.descriptionLog} alt="logo" src="/ChoerodonUI_logo.svg" />
            <h2 className={styles.descriptionText}>Choerodon UI 用于开发和服务于企业级后台产品 </h2>
            <img className={styles.descriptionImg} alt="description" src="/description.svg" />
          </Col>
          <Col className={styles.login} xs={2} sm={4} md={6} lg={12} xl={12}>
            <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
            <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.header}>
                  <Link to="/">
                    <span className={styles.title}>登录</span>
                  </Link>
                </div>
              </div>
              <div className={styles.main}>
                <Tabs>
                  <TabPane tab="用户名登陆" key="1">
                    <Form
                      onSuccess={haneleSuccess}
                      dataSet={nameLoginDS}
                      labelLayout={'float' as LabelLayout}
                    >
                      <TextField labelWidth={4} name="userName" clearButton />
                      <Password name="userPassword" />
                      <div>
                        <CheckBox label="自动登陆" name="frozen" ></CheckBox> <span className={styles.forgetPassword}>忘记密码</span>
                        <Button color={'primary' as ButtonColor} type={'submit' as ButtonType}>登录</Button>
                      </div>
                    </Form>
                  </TabPane>
                  <TabPane tab="手机号码登录" key="2">
                    <Form
                      onSuccess={haneleSuccess}
                      dataSet={captchaDS}
                      className={styles.phoneForm}
                      labelLayout={'float' as LabelLayout}
                    >
                      <TextField
                        labelWidth={150}
                        pattern="1[3-9]\d{9}"
                        name="phoneNumber"
                        clearButton
                        addonBefore="+86"
                        addonAfter="中国大陆"
                      />
                      <TextField
                        name="phoneCaptcha"
                        pattern="1[3-9]\d{9}"
                        maxLength={4}
                        addonAfter={captchaButton}
                      />
                      <div>
                        
                        <Button color={'primary' as ButtonColor} type={'submit' as ButtonType}>登录</Button>
                      </div>
                    </Form>
                  </TabPane>
                </Tabs>
                <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
                <AliPayIcon className={styles.icon} />
                <Taobao className={styles.icon} />
                <Wechat className={styles.icon} />
                <span className={styles.register}>注册账户</span>
              </div>
            </div>
            <Footer />
          </Col>
        </Row>
      </div>
  );
};

export default Login;
