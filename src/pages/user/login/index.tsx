import { message, Tabs } from 'choerodon-ui';
import { Form, TextField, Password, DataSet, Button } from 'choerodon-ui/pro';
import React, { useContext, useMemo } from 'react';
import { Link, history, FormattedMessage, SelectLang } from 'umi';
import Footer from '@/components/Footer';
import { getFakeCaptcha, LoginParamsType } from '@/services/login';
import { LabelLayout } from 'choerodon-ui/pro/lib/form/enum';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import { ButtonType, FuncType } from 'choerodon-ui/pro/lib/button/enum';
import Container from '@hzero-front-ui/cfg/lib/components/Container';
import ThemeContext from '@hzero-front-ui/cfg/lib/utils/ThemeContext';
import useThemeHelper from '@hzero-front-ui/cfg/lib/components/Container/useThemeHelper';
import { defaultConfig } from '@hzero-front-ui/cfg/lib/utils/config';
import { ThemeSchema } from '@hzero-front-ui/cfg/lib/utils';

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
  const { setTheme } = useContext(ThemeContext);
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
  // @ts-ignore
  setTheme(conf);
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
    <Container defaultTheme="theme1">
      <div className={styles.container}>
        <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src="/logo.svg" />
                <span className={styles.title}>c7n-pro</span>
              </Link>
            </div>
            <div className={styles.desc}>c7n-pro 高效率开发设计框架</div>
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
                    <Button type={'submit' as ButtonType}>登录</Button>
                    <Button type={'reset' as ButtonType} style={{ marginLeft: 8 }}>
                      重置
                    </Button>
                  </div>
                </Form>
              </TabPane>
              <TabPane tab="手机号码登录" key="2">
                <Form
                  onSuccess={haneleSuccess}
                  dataSet={captchaDS}
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
                    <Button type={'submit' as ButtonType}>登录</Button>
                    <Button type={'reset' as ButtonType} style={{ marginLeft: 8 }}>
                      重置
                    </Button>
                  </div>
                </Form>
              </TabPane>
            </Tabs>
            <FormattedMessage id="pages.login.loginWith" defaultMessage="其他登录方式" />
          </div>
        </div>
        <Footer />
      </div>
    </Container>
  );
};

export default Login;
