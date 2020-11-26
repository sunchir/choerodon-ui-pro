import React from 'react';
import { Card, Alert , Row, Icon } from 'choerodon-ui';
import { PageContainer } from '@ant-design/pro-layout';

export default (): React.ReactNode => (
  <PageContainer content=" 这个页面只有 admin 权限才能查看">
    <Card>
      <Alert
        message="umi ui 现已发布，欢迎使用 npm run ui 启动体验。"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 48,
        }}
      />
      <Row style={{ textAlign: 'center' }}>
      <Icon type="face-o"   style={{color: 'greenyellow'}} /> C7n Pro <Icon type="favorite_border-o"  style={{color: 'pink'}} />  You
      </Row>
    </Card>
    <p style={{ textAlign: 'center', marginTop: 24 }}>
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageContainer>
);
