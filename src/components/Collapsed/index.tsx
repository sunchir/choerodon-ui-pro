import React from 'react';
import { useModel } from 'umi';
import { Icon } from 'choerodon-ui';
import styles from './index.less';

export interface CollapseProps {
    collapsed: boolean;
}

const Collapse: React.FC<CollapseProps> = ({ collapsed }) => {
    const { initialState, setInitialState } = useModel('@@initialState');
    const handClickCollapseIcon = () => {
        setInitialState(
            {...initialState, settings: {...initialState.settings,collapsed:!collapsed}}
        );
    };
    return (
        <div className={styles.collapseContainer}>
            <div className={styles.shawdow} />
            { collapsed ? <Icon onClick={handClickCollapseIcon} className={styles.icon} type="navigate_next" /> : <Icon onClick={handClickCollapseIcon} className={styles.icon} type="navigate_before" />}
        </div>
    );
};
export default Collapse;
