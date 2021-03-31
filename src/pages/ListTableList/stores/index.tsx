import React, { createContext, useMemo } from 'react';
import { DataSet } from 'choerodon-ui/pro';
import operationRecordDS from './operationRecordDS';
import tableDS from './tableDS';

const Store = createContext<
  Partial<{ children: React.ReactElement; operationRecordDataSet: DataSet; tableDataSet: DataSet }>
>({});

export const StoreProvider = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const operationRecordDataSet = useMemo(() => new DataSet(operationRecordDS()), []);
  const tableDataSet = useMemo(() => new DataSet(tableDS()), []);
  const value = {
    ...props,
    operationRecordDataSet,
    tableDataSet,
  };

  return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default Store;
