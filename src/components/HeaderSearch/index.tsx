import { AutoComplete, DataSet, Tooltip, Icon } from 'choerodon-ui/pro';
import React, { useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { RenderProps } from 'choerodon-ui/pro/lib/field/FormField';
import { FieldType } from 'choerodon-ui/pro/lib/data-set/enum';
import styles from './index.less';

export interface HeaderSearchProps {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: object[];
  defaultOpen?: boolean;
  open?: boolean;
  defaultValue?: string;
  value?: string;
}

const HeaderSearch: React.FC<HeaderSearchProps> = observer((props) => {
  const { options } = props;

  const renderer = ({ icon, meaning, src }: { icon: string; meaning: string; src: string }) => (
    <div style={{ width: '100%' }}>
      {meaning && <Icon type={icon} />} <a href={src}>{meaning}</a>
    </div>
  );

  const optionRenderer = ({ record }: RenderProps) => {
    if (record) {
      const data: { icon: string; meaning: string; src: string } = record.toData();
      return (
        <Tooltip title={data.meaning} placement="left">
          {renderer(data)}
        </Tooltip>
      );
    }
    return null;
  };

  const [HeaderSearchDS] = useState(() => {
    return new DataSet({
      fields: [{ name: 'seachValue', type: 'string' as FieldType, label: '查询值' }],
    });
  });

  const optionDS = useMemo(() => {
    return new DataSet({
      fields: [
        {
          name: 'value',
          type: 'string' as FieldType,
        },
        {
          name: 'meaning',
          type: 'string' as FieldType,
        },
        {
          name: 'icon',
          type: 'string' as FieldType,
        },
        {
          name: 'src',
          type: 'string' as FieldType,
        },
      ],
      data: options,
    });
  }, []);

  return (
    <AutoComplete
      className={styles.headerSearch}
      options={optionDS}
      name="user"
      dataSet={HeaderSearchDS}
      optionRenderer={optionRenderer}
    />
  );
});

export default HeaderSearch;
