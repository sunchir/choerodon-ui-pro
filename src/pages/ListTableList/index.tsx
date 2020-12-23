import React, { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card } from 'choerodon-ui';
import TablePage from './components/TablePage';
import { useIntl } from 'umi';


const { TabPane } = Tabs;

const StandardTable: FC = () => {
  const intl = useIntl();
  return (
    <PageContainer content={intl.formatMessage({id:'menu.list'})}>
      <div>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab={intl.formatMessage({id:'menu.list.all'})} key="1">
              <TablePage serialType="all" />
            </TabPane>
            <TabPane tab={intl.formatMessage({id:'menu.list.wait'})} key="2">
              <TablePage serialType="to-do" />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </PageContainer>
  );
};

export default StandardTable;
