import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card } from 'choerodon-ui';
import TablePage from './components/TablePage';

const { TabPane } = Tabs;

const StandardTable: FC = () => {
  return (
    <PageContainer content="基本表单">
      <div>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="全部" key="1">
              <TablePage serialType="all" />
            </TabPane>
            <TabPane tab="待办" key="2">
              <TablePage serialType="to-do" />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </PageContainer>
  );
};

export default StandardTable;
