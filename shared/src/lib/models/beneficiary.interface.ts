export interface Beneficiary {
  id: string;
  name: string;
  status: string;
  benefits: string[];
}

export interface BeneficiaryDatabase {
  [key: string]: Beneficiary;
}
