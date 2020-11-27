import Mock from 'mockjs';
import { Request, Response } from 'express';

const getFakeList = (req: Request, res: Response) => {
  const result: any[] = [];

  const params = req.query as any;
  const {
    size = 10,
    page,
    status,
    serialNumber = '',
    title = '',
    startTime,
    endTime,
    serialType,
  } = params;
  if (serialType === 'to-do') {
    return res.json({
      rows: [],
      success: true,
      total: 0,
    });
  }

  for (let i = 0; i < size; i++) {
    const len: number = result.length;
    result.push({
      serialNumber: `1000${serialNumber}${len}-${page * size}`,
      title: `标题${title}${len}`,
      description: '描述文字描述文字描述文字描述文字描述文字描述文字',
      status: status !== undefined ? Number(status) : Math.round(Math.random()),
      operator: '张三',
      remark: '备注',
      createTime: endTime || startTime || '2020-11-09 08:33:11',
    });
  }

  return res.json({
    rows: result,
    success: true,
    total: size * 10,
  });
};

const deleteFakeData = (req: Request, res: Response) => {
  res.send(req.body);
};

const submitData = (req: Request, res: Response) => {
  // 需要处理新建的情况
  res.send(
    req.body.map((v: any) => ({
      serialNumber: `${Math.floor(Math.random() * 100000)}`,
      operator: '张三',
      createTime: '2020-11-09 08:33:11',
      ...v,
    })),
  );
};

const getOperationRecord = (req: Request, res: Response) => {
  const result: any[] = [];
  const params = req.query as any;
  const { size = 10, page, serialNumber, operatorType } = params;
  for (let i = 0; i < size; i++) {
    const len: number = result.length;
    result.push({
      operator: `张三${len}-${page * size}-${serialNumber}`,
      operatorType:
        operatorType !== undefined ? operatorType : `${Math.random() > 0.5 ? 'add' : 'edit'}`,
      operatorTime: '2020-11-09 08:33:11',
    });
  }

  return res.json({
    rows: result,
    success: true,
    total: size * 10,
  });
};

const statusData = {
  rows: [
    {
      objectVersionNumber: 1,
      codeId: 10001,
      codeValueId: 10027,
      description: null,
      meaning: '禁用',
      value: 0,
      orderSeq: 10,
      tag: null,
      enabledFlag: 'Y',
      parentCodeValueId: null,
      parentCodeValue: null,
      parentCodeValueMeaning: null,
    },
    {
      objectVersionNumber: 1,
      codeId: 10001,
      codeValueId: 10028,
      description: null,
      meaning: '启用',
      value: 1,
      orderSeq: 20,
      tag: null,
      enabledFlag: 'Y',
      parentCodeValueId: null,
      parentCodeValue: null,
      parentCodeValueMeaning: null,
    },
  ],
};

const operatorTypeData = {
  rows: [
    {
      objectVersionNumber: 1,
      codeId: 10001,
      codeValueId: 10027,
      description: null,
      meaning: '新建',
      value: 'add',
      orderSeq: 10,
      tag: null,
      enabledFlag: 'Y',
      parentCodeValueId: null,
      parentCodeValue: null,
      parentCodeValueMeaning: null,
    },
    {
      objectVersionNumber: 1,
      codeId: 10001,
      codeValueId: 10028,
      description: null,
      meaning: '编辑',
      value: 'edit',
      orderSeq: 20,
      tag: null,
      enabledFlag: 'Y',
      parentCodeValueId: null,
      parentCodeValue: null,
      parentCodeValueMeaning: null,
    },
    {
      objectVersionNumber: 1,
      codeId: 10001,
      codeValueId: 10028,
      description: null,
      meaning: '删除',
      value: 'delete',
      orderSeq: 20,
      tag: null,
      enabledFlag: 'Y',
      parentCodeValueId: null,
      parentCodeValue: null,
      parentCodeValueMeaning: null,
    },
  ],
};

const dataSetLovTemple = {
  'rows|10': [
    {
      _token: '@guid()',
      'objectVersionNumber|1-10': 1,
      code: "@pick(['HR', 'SYS']).@upper(@word)",
      'codeId|+1': 10001,
      codeValues: '@ctitle()',
      description: '@ctitle()',
      type: '@name',
      enabledFlag: /[NY]/,
      parentCodeId: [/1[0-9]{10}/, /1[0-9]{10}/],
      parentCodeDescription: '@sentence(3, 6)',
    },
  ],
  success: true,
  total: 35,
};

const lovDefineTemple = {
  _token: '@guid()',
  objectVersionNumber: 1,
  code: 'LOV_CODE',
  description: '快码',
  height: 300,
  lovId: 10015,
  lovItems: [
    {
      _token: '@guid()',
      objectVersionNumber: 1,
      lovItemId: 10033,
      lovId: 10015,
      display: '代码',
      gridFieldName: 'code',
      gridFieldWidth: 150,
      gridFieldAlign: 'left',
      autocompleteField: 'Y',
      conditionField: 'Y',
      isAutocomplete: 'N',
      gridField: 'Y',
      conditionFieldWidth: null,
      conditionFieldLabelWidth: null,
      conditionFieldType: null,
      conditionFieldName: null,
      conditionFieldTextfield: null,
      conditionFieldNewline: 'N',
      conditionFieldSelectUrl: null,
      conditionFieldSelectVf: null,
      conditionFieldSelectTf: null,
      conditionFieldSelectCode: null,
      conditionFieldLovCode: null,
      conditionFieldSequence: 1,
      gridFieldSequence: 1,
    },
    {
      _token: '@guid()',
      objectVersionNumber: 1,
      lovItemId: 10034,
      lovId: 10015,
      display: '描述',
      gridFieldName: 'description',
      gridFieldWidth: 250,
      gridFieldAlign: 'left',
      autocompleteField: 'Y',
      conditionField: 'Y',
      isAutocomplete: 'N',
      gridField: 'Y',
      conditionFieldWidth: null,
      conditionFieldLabelWidth: null,
      conditionFieldType: null,
      conditionFieldName: null,
      conditionFieldTextfield: null,
      conditionFieldNewline: 'N',
      conditionFieldSelectUrl: null,
      conditionFieldSelectVf: null,
      conditionFieldSelectTf: null,
      conditionFieldSelectCode: null,
      conditionFieldLovCode: null,
      conditionFieldSequence: 2,
      gridFieldSequence: 2,
    },
    {
      _token: '@guid()',
      objectVersionNumber: 1,
      lovItemId: 10034,
      lovId: 10015,
      display: '描述2',
      gridFieldName: 'description2',
      gridFieldWidth: 250,
      gridFieldAlign: 'left',
      autocompleteField: 'Y',
      conditionField: 'Y',
      isAutocomplete: 'N',
      gridField: 'Y',
      conditionFieldWidth: null,
      conditionFieldLabelWidth: null,
      conditionFieldType: null,
      conditionFieldName: null,
      conditionFieldTextfield: null,
      conditionFieldNewline: 'N',
      conditionFieldSelectUrl: null,
      conditionFieldSelectVf: null,
      conditionFieldSelectTf: null,
      conditionFieldSelectCode: null,
      conditionFieldLovCode: null,
      conditionFieldSequence: 2,
      gridFieldSequence: 2,
    },
  ],
  placeholder: '请选择快码',
  sqlId: 'CodeMapper.select',
  customSql: null,
  queryColumns: 2,
  customUrl: null,
  textField: 'description',
  title: '父级快码',
  valueField: 'code',
  width: 710,
  delayLoad: 'N',
  needQueryParam: 'N',
  editableFlag: 'Y',
  canPopup: 'Y',
  lovPageSize: '10',
  treeFlag: 'N',
  idField: null,
  parentIdField: null,
};

const lovTempleData = Mock.mock(dataSetLovTemple);

const lovDefineData = Mock.mock(lovDefineTemple);

export default {
  'GET /_api/standard-table/query': getFakeList,
  'DELETE /_api/standard-table/delete': deleteFakeData,
  'POST /_api/standard-table/submit': submitData,
  'GET /_api/standard-table/operation-record/query': getOperationRecord,
  'DELETE /_api/standard-table/operation-record/delete': deleteFakeData,
  'GET /_api/standard-table/code/status': statusData,
  'GET /_api/standard-table/code/operatorType': operatorTypeData,
  'POST /_api/form/dataset/common/lov/dataset/LOV_CODE': lovTempleData,
  'POST /_api/sys/lov/lov_define': lovDefineData,
};
