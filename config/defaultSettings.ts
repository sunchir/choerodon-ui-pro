import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 拂晓蓝
  primaryColor: '#5365EA',
  layout: 'mix',
  contentWidth: 'Fluid',
  headerTheme: 'light',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '',
  pwa: false,
  logo: 'https://pic.downk.cc/item/5fe005a73ffa7d37b317b7fb.png',
  iconfontUrl: '',
};

export default Settings;
