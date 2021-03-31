import React, { useMemo } from 'react';
import { PageContainer } from '@choerodon-ui/pro-layout';
import { CodeArea, DataSet, Button } from 'choerodon-ui/pro';
import { Card, Alert } from 'choerodon-ui';
// 引入格式化器
import JSFormatter from 'choerodon-ui/pro/lib/code-area/formatters/JSFormatter';
// 引入 javascript lint
import 'choerodon-ui/pro/lib/code-area/lint/javascript';
import type { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import type { FuncType } from 'choerodon-ui/pro/lib/button/enum';
import { useIntl } from 'umi';

const options = { mode: 'javascript' };

const jsStyle = { height: 400 };

const DataSetCodeArea: React.FC<{}> = () => {
  const intl = useIntl();

  const jsText = `
  const tempDS = new DataSet({
    autoCreate: true,
    fields: [
      { name: 'phone', defaultValue: '15888888888', type: 'string', label: '手机号' },
      { name: 'age', defaultValue: 18, type: 'number', label: '年龄' },
      { name: 'sex', defaultValue: 'F', type: 'string', label: '性别', lookupCode: 'HR.EMPLOYEE_GENDER' },
      { name: 'language', defaultValue: 'zh-CN', type: 'string', label: '语言' },
    ],
  });
  `;
  const DataSetDS = useMemo(() => {
    return new DataSet({
      autoCreate: true,
      fields: [
        {
          name: 'content',
          type: 'string' as FieldType,
          defaultValue: jsText,
          required: true,
        },
      ],
    });
  }, []);

  return (
    <div>
      <h4>
        {intl.formatMessage({
          id: 'pages.welcome.everyWhere',
          defaultMessage: 'dataSet 一套配置多组件适用',
        })}
      </h4>
      <CodeArea
        dataSet={DataSetDS}
        name="content"
        style={jsStyle}
        formatter={JSFormatter}
        options={options}
      />
    </div>
  );
};

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <Card>
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.description',
            defaultMessage: '提炼自lowCode理念，为前端效能服务的组件库欢迎尝试',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <DataSetCodeArea />

        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.advanced',
            defaultMessage:
              'Table, Form 等重型组件应有尽有，结合umi效能工具 + 效能组件库 ，锦上添花',
          })}
          showIcon
          banner
          type="info"
          style={{
            margin: '.12rem -.12rem ',
            marginBottom: 24,
          }}
        />
        <Button
          funcType={'flat' as FuncType}
          href="http://open-hand.gitee.io/choerodon-ui"
          target="_blank"
        >
          {intl.formatMessage({ id: 'pages.welcome.localUrl', defaultMessage: '猪齿鱼UI官网地址' })}
        </Button>
      </Card>
    </PageContainer>
  );
};
