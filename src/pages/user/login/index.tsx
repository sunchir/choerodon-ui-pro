import { message, Tabs, Row, Col } from 'choerodon-ui';
import { Form, TextField, Password, DataSet, Button, CheckBox } from 'choerodon-ui/pro';
import React, { useMemo } from 'react';
import { Link, history, FormattedMessage, SelectLang, useIntl } from 'umi';
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
  const intl = useIntl();
  setLocalTheme(conf);
  const haneleSuccess = async (values: LoginParamsType) => {
    try {
      if (values.success === true) {
        message.success(
          intl.formatMessage({ id: 'pages.login.success', defaultMessage: '登录成功' }),
        );
        goto();
        return;
      }
    } catch (error) {
      message.error(
        message.success(intl.formatMessage({ id: 'pages.login.fail', defaultMessage: '登录失败' })),
      );
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
          label: intl.formatMessage({ id: 'pages.login.userName', defaultMessage: '用户名' }), // 字段标签 可以在form或者table上生成对应的label
          required: true,
        },
        {
          name: 'userPassword',
          type: 'string' as FieldType,
          label: intl.formatMessage({ id: 'pages.login.userPassword', defaultMessage: '用户密码' }),
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
          label: intl.formatMessage({ id: 'pages.login.phoneNumber', defaultMessage: '手机号码' }), // 字段标签 可以在form或者table上生成对应的label
          required: true,
        },
        {
          name: 'phoneCaptcha',
          type: 'number' as FieldType,
          label: intl.formatMessage({ id: 'pages.login.phoneCaptcha', defaultMessage: '验证码' }),
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
          message.success(
            intl.formatMessage({
              id: 'pages.login.captcha.success',
              defaultMessage: '获取验证码成功！验证码为：1234',
            }),
          );
        } else {
          message.error(
            intl.formatMessage({
              id: 'pages.login.phoneNumber.placeholder',
              defaultMessage: '请输入手机号！',
            }),
          );
        }
      }}
    >
      {intl.formatMessage({
        id: 'pages.login.phoneLogin.getVerificationCode',
        defaultMessage: '获取验证码',
      })}
    </Button>
  );

  return (
    <div className={styles.container}>
      <Row className={styles.row}>
        <Col className={styles.description} xs={2} sm={4} md={6} lg={12} xl={12}>
          <img className={styles.descriptionLog} alt="logo" src="/ChoerodonUI_logo.svg" />
          <h2 className={styles.descriptionText}>
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
              defaultMessage: 'Choerodon UI 用于开发和服务于企业级后台产品',
            })}
          </h2>
          <img className={styles.descriptionImg} alt="description" src="/description.svg" />
        </Col>
        <Col className={styles.login} xs={2} sm={4} md={6} lg={12} xl={12}>
          <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.header}>
                <Link to="/">
                  <span className={styles.title}>
                    {intl.formatMessage({
                      id: 'pages.login.submit',
                      defaultMessage: '登录',
                    })}
                  </span>
                </Link>
              </div>
            </div>
            <div className={styles.main}>
              <Tabs>
                <TabPane
                  tab={intl.formatMessage({
                    id: 'pages.login.accountLogin.tab',
                    defaultMessage: '账户密码登录',
                  })}
                  key="1"
                >
                  <Form
                    onSuccess={haneleSuccess}
                    dataSet={nameLoginDS}
                    labelLayout={'float' as LabelLayout}
                  >
                    <TextField labelWidth={4} name="userName" clearButton />
                    <Password name="userPassword" />
                    <div>
                      <div className={styles.loginAutoLogin}>
                        <CheckBox
                          label={intl.formatMessage({
                            id: 'pages.login.rememberMe',
                            defaultMessage: '自动登录',
                          })}
                          name="frozen"
                        />{' '}
                        <span className={styles.forgetPassword}>
                          {intl.formatMessage({
                            id: 'pages.login.forgotPassword',
                            defaultMessage: '忘记密码 ?',
                          })}
                        </span>
                      </div>
                      <Button color={'primary' as ButtonColor} type={'submit' as ButtonType}>
                        {intl.formatMessage({
                          id: 'pages.login.submit',
                          defaultMessage: '登录',
                        })}
                      </Button>
                    </div>
                  </Form>
                </TabPane>
                <TabPane
                  tab={intl.formatMessage({
                    id: 'pages.login.phoneLogin.tab',
                    defaultMessage: '手机号登录',
                  })}
                  key="2"
                >
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
                      addonAfter={intl.formatMessage({
                        id: 'pages.login.phoneLogin.china',
                        defaultMessage: '中国大陆',
                      })}
                    />
                    <TextField
                      name="phoneCaptcha"
                      pattern="1[3-9]\d{9}"
                      maxLength={4}
                      addonAfter={captchaButton}
                    />
                    <div>
                      <Button color={'primary' as ButtonColor} type={'submit' as ButtonType}>
                        {intl.formatMessage({
                          id: 'pages.login.submit',
                          defaultMessage: '登录',
                        })}
                      </Button>
                    </div>
                  </Form>
                </TabPane>
              </Tabs>
              <div className={styles.loginFooter}>
                <FormattedMessage
                  id="pages.login.loginWith"
                  defaultMessage={intl.formatMessage({
                    id: 'pages.login.loginWith',
                    defaultMessage: '其他登录方式 :',
                  })}
                />
                <AliPayIcon className={styles.icon} />
                <Taobao className={styles.icon} />
                <Wechat className={styles.icon} />
                <span className={styles.register}>
                  {intl.formatMessage({
                    id: 'pages.login.registerAccount',
                    defaultMessage: '注册账户',
                  })}
                </span>
              </div>
            </div>
          </div>
          <Footer />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
