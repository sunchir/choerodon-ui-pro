import type { FC } from 'react';
import { useEffect } from 'react';
import React, { useContext } from 'react';
import { Table } from 'choerodon-ui/pro';
import { Tag } from 'choerodon-ui';
import type { TableButtonType } from 'choerodon-ui/pro/lib/table/enum';
import type { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import style from '../index.less';
import { handleDealWithRecord, operatorsRenderer } from '../utils/index';
import Store from '../stores';

const { Column } = Table;

type TablePageProps = {
  serialType: string;
};
const TablePage: FC<TablePageProps> = ({ serialType }) => {
  const { tableDataSet, operationRecordDataSet } = useContext(Store);
  useEffect(() => {
    if (tableDataSet) {
      tableDataSet.setQueryParameter('serialType', serialType);
    }
  }, [serialType, tableDataSet]);
  return (
    <div className={style['table-wrapper']}>
      <Table
        dataSet={tableDataSet!}
        buttons={[
          [
            'delete' as TableButtonType,
            {
              color: 'default' as ButtonColor,
            },
          ],
          [
            'add' as TableButtonType,
            {
              onClick: () => {
                handleDealWithRecord(tableDataSet!);
              },
            },
          ],
        ]}
        queryFieldsLimit={3}
        pagination={{
          showPager: true,
        }}
        rowHeight={34}
      >
        <Column name="serialNumber" help="项目编号帮助信息" />
        <Column name="title" />
        <Column name="description" />
        <Column
          name="status"
          renderer={({ value }) => {
            return value ? <Tag color="lime">开启</Tag> : <Tag color="volcano">关闭</Tag>;
          }}
        />
        <Column name="operator" />
        <Column name="remark" />
        <Column name="createTime" sortable />
        <Column
          header="操作"
          renderer={(props) => {
            return operatorsRenderer(props, operationRecordDataSet);
          }}
          width={330}
        />
      </Table>
    </div>
  );
};

export default TablePage;
