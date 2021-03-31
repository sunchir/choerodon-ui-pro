import type { FC } from 'react';
import React from 'react';
import type { DataSet } from 'choerodon-ui/pro';
import { Table } from 'choerodon-ui/pro';
import type { TableButtonType } from 'choerodon-ui/pro/lib/table/enum';
import type { ButtonColor } from 'choerodon-ui/pro/lib/button/enum';

import style from '../index.less';

const { Column } = Table;

const OperationRecord: FC<{
  operationRecordDataSet?: DataSet;
}> = (props) => {
  const { operationRecordDataSet } = props;

  return (
    <div className={style['table-wrapper']}>
      {operationRecordDataSet ? (
        <Table
          dataSet={operationRecordDataSet}
          buttons={[
            [
              'delete' as TableButtonType,
              {
                color: 'default' as ButtonColor,
              },
            ],
          ]}
          // 默认的queryFieldsLimit为3 会导致在少于三个query的情况下宽度设置过窄的问题
          // 见 c7nConfig
          queryFieldsLimit={1}
          rowHeight={34}
        >
          <Column name="operator" />
          <Column name="operatorType" />
          <Column name="operatorTime" />
        </Table>
      ) : null}
    </div>
  );
};

export default OperationRecord;
