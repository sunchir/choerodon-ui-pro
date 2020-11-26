import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 汉得前端基础研发出品"
    links={[
      {
        key: 'c7n Pro',
        title: 'c7n Pro',
        href: 'http://croal.open-front.hand-china.com/',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/sunchir/choerodon-ui-pro',
        blankTarget: true,
      },
      {
        key: 'Choerodon UI',
        title: 'Choerodon UI',
        href: 'https://open-hand.gitee.io/choerodon-ui/zh',
        blankTarget: true,
      },
    ]}
  />
);
