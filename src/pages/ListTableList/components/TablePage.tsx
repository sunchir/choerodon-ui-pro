import React, { FC, useMemo } from 'react';
import { Table, DataSet } from 'choerodon-ui/pro';
import { Tag } from 'choerodon-ui';
import { TableButtonType } from 'choerodon-ui/pro/lib/table/enum';
import { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';
import style from '../index.less';
import getTableDSProps from '../stores/tableDS';
import { handleDealWithRecord, operatorsRenderer } from '../utils/index';

const { Column } = Table;

interface TablePageProps {
  serialType: string;
}
const TablePage: FC<TablePageProps> = ({ serialType }) => {
  const tableDs = useMemo(() => new DataSet(getTableDSProps(serialType)), []);

  return (
    <div className={style['table-wrapper']}>
      <Table
        dataSet={tableDs!}
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
                handleDealWithRecord(tableDs!);
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
        <Column header="操作" renderer={operatorsRenderer} width={330} />
      </Table>
    </div>
  );
};

export default TablePage;
