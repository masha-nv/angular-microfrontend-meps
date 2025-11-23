import { IMenuItem } from '../types/menu-item';

export const menuItems: IMenuItem[] = [
  { label: 'Snapshot', key: 'snapshot', url: '/snapshot' },
  { label: 'Enrollment', key: 'enrollment', url: '/enrollment' },
  { label: 'Payments', key: 'payments', url: '/payments' },
  { label: 'Adjustments', key: 'adjustments', url: '/adjustments' },
  { label: 'Premiums', key: 'premiums', url: '/premiums' },
  { label: 'LEP', key: 'lep', url: '/lep' },
  { label: 'SSA-­RRB', key: 'ssa-rrb', url: '/ssa-rrb' },
  {
    label: 'PW Paid/Collected',
    key: 'pwpaid/collected',
    url: '/pwpaid/collected',
  },
  { label: 'Transactions', key: 'transactions', url: '/transactions' },
  { label: 'Utilization', key: 'utilization', url: '/utilization' },
  { label: 'MSA', key: 'msa', url: '/msa' },
  {
    label: 'Residence Address',
    key: 'residenceaddress',
    url: '/residenceaddress',
  },
  { label: 'Rx Insurance', key: 'rxinsurance', url: '/rxinsurance' },
  { label: 'Status Activity', key: 'statusactivity', url: '/statusactivity' },
  { label: 'Add Enroll Info', key: 'addenrollinfo', url: '/addenrollinfo' },
];
