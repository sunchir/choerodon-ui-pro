import React, { FC } from 'react';
import { Form, TextField, TextArea, Switch } from 'choerodon-ui/pro';

import Record from 'choerodon-ui/pro/lib/data-set/Record';

const EditDetail: FC<{
  record: Record;
  readOnly?: boolean;
  isNew?: boolean;
}> = (props) => {
  const { record, readOnly = false, isNew = false } = props;
  return (
    <div>
      <Form disabled={readOnly} record={record}>
        {!isNew && <TextField name="serialNumber" disabled />}
        <TextField name="title" />
        <TextArea name="description" />
        <TextField name="remark" />
        <Switch name="status" />
      </Form>
    </div>
  );
};

export default EditDetail;
