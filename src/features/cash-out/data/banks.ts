export interface Bank {
  id: string;
  name: string;
}

export const BANKS: Bank[] = [
  { id: 'bdo', name: 'BDO Unibank' },
  { id: 'bpi', name: 'Bank of the Philippine Islands (BPI)' },
  { id: 'metrobank', name: 'Metropolitan Bank & Trust Co. (Metrobank)' },
  { id: 'pnb', name: 'Philippine National Bank (PNB)' },
  { id: 'security', name: 'Security Bank' },
  { id: 'chinabank', name: 'China Banking Corporation' },
  { id: 'rcbc', name: 'RCBC (Rizal Commercial Banking Corporation)' },
  { id: 'unionbank', name: 'Union Bank of the Philippines' },
  { id: 'eastwest', name: 'East West Banking Corporation' },
  { id: 'aub', name: 'Asia United Bank (AUB)' },
  { id: 'gcash', name: 'GCash' },
  { id: 'maya', name: 'Maya' },
];

export function getBankById(id: string): Bank | undefined {
  return BANKS.find((bank) => bank.id === id);
}
