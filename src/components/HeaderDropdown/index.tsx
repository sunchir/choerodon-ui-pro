import { DropDownProps } from 'choerodon-ui/pro/lib/dropdown/Dropdown';
import { Dropdown } from 'choerodon-ui/pro';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends Omit<DropDownProps, 'overlay'> {
  popupClassName?: string;
  overlay: React.ReactNode | OverlayFunc | any;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ popupClassName: cls, ...restProps }) => (
  <Dropdown popupClassName={classNames(styles.container, cls)} {...restProps} />
);

export default HeaderDropdown;
