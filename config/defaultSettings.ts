import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#5365EA',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'C7n Pro',
  pwa: false,
  logo: 'https://choerodon.io/img/nav/choerodon_logo_fixed.svg',
  iconfontUrl: '',
};

export default Settings;
