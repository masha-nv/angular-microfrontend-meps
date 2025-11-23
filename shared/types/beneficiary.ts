export interface IBeneficiary {
  firstName: string;
  lastName: string;
  beneficiaryId: string;
  birthDate: string; // MM/DD/YYYY
  dateOfDeath: string; // “--” or actual date
  age: string; // ## if not known
  sex: 'Male' | 'Female' | 'Other';
  address: string;
  state: string;
  county: string;
  status: 'Active' | 'Inactive';
}
