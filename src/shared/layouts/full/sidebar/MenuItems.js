import WidgetsIcon from '@mui/icons-material/Widgets';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: 1,
    pid: 0,
    navlabel: true,
    subheader: 'Home',
    show: false
  },

  {
    id: 2,
    pid: 1,
    title: 'Dashboard',
    icon: WidgetsIcon,
    href: '/dashboard',
    show: false
  },
  {
    id: 3,
    navlabel: false,
    subheader: 'Utilities',
    show: false
  },
  {
    id: 4,
    pid: 3,
    title: 'Data Upload',
    icon: WidgetsIcon,
    href: '/uploaddata',
    show: false
  },
  {
    id: 5,
    pid: 3,
    title: 'Uploaded Data',
    icon: WidgetsIcon,
    href: '/startverification',
    show: false
  },
  {
    id: 6,
    pid: 0,
    navlabel: true,
    subheader: 'Under Process',
    show: false
  },
  {
    id: 7,
    pid: 6,
    title: 'Processing',
    icon: WidgetsIcon,
    href: '/processing',
    show: false
  },
  {
    id: 8,
    pid: 6,
    title: 'Laspesd Data',
    icon: WidgetsIcon,
    href: '/expired',
    show: false
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Critical',
    icon: WidgetsIcon,
    href: '/critical',
  },
  {
    id: uniqueId(),
    title: 'Link not Sent',
    icon: WidgetsIcon,
    href: '/nonprocess',
  },
  {
    navlabel: true,
    subheader: 'Report',
  },
  {
    id: uniqueId(),
    title: 'Verified',
    icon: WidgetsIcon,
    href: '/verified',
  },
  {
    id:uniqueId(),
    title:'PF',
    icon: WidgetsIcon,
    href: '/PfPension',
  },
  {
    id: uniqueId(),
    title: 'Cancelled',
    icon: WidgetsIcon,
    href: '/cancelled',
  },
  {
    navlabel: true,
    subheader: 'Setup',
  },
  {
    id: uniqueId(),
    title: 'General setting',
    icon: WidgetsIcon,
    href: '/setup',
  },
];

export default Menuitems;
