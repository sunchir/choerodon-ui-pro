import { Tooltip, Tag, Row, Col } from 'choerodon-ui';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC<{}> = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Row className={className}>
      <Col span={6}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder="站内搜索"
          defaultValue="umi ui"
          options={[
            {
              meaning: 'umiui',
              value: 'umi ui',
              src: 'https://umijs.org/zh/guide/umi-ui.html',
              icon: 'extension',
            },
            {
              meaning: 'umi生态相关插件',
              src: 'https://beta-pro.ant.design/blog/layout-new-style-cn',
              value: 'umi Plugins umi生态相关插件',
              icon: 'explore',
            },
            {
              meaning: '表格例子',
              value: 'Pro Table 表格例子',
              src: 'https://protable.ant.design/',
              icon: 'explicit',
            },
            {
              meaning: '布局文档',
              src: 'https://procomponents.ant.design/components/layout',
              value: 'Pro Layout 布局文档',
              icon: 'filter_hdr-o',
            },
          ]}
        />
      </Col>
      <Col span={2}>
        <Tooltip title="使用文档">
          <span
            className={styles.action}
            onClick={() => {
              window.location.href = 'https://pro.ant.design/docs/getting-started';
            }}
          >
            <QuestionCircleOutlined />
          </span>
        </Tooltip>
      </Col>
      <Col span={5}>
        <Avatar />
      </Col>
      <Col span={4}>
        {REACT_APP_ENV && (
          <span>
            <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
          </span>
        )}
      </Col>
      <Col span={4}>
        <SelectLang className={styles.action} />
      </Col>
    </Row>
  );
};
export default GlobalHeaderRight;
