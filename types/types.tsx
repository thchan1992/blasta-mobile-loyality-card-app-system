export interface Business {
  _id: string;
  logo: string;
  loyaltyProgram: number;
  name: string;
}

export interface CustomerData {
  _id: string;
  businessId: Business;
  count: number;
}
