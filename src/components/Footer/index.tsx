import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@choerodon-ui/pro-layout';

export default () => (
  <DefaultFooter
    copyright="The choerodon Author®. All rights reserved."
    style={{ background: 'white' }}
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
