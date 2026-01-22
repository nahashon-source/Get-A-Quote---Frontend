export interface PersonalInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  company?: string;
}

export interface ServiceRequirements {
  serviceType: string;
  origin: string;
  destination: string;
  length: string;
  width: string;
  height: string;
  commodityType: string;
  specialHandling?: string;
}

export interface CargoInformation {
  cargoDescription: string;
  weight: string;
  packagingType: string;
  cargoValue: string;
  currency: string;
  urgencyLevel: string;
  specialRequirements?: string;
}

export interface FreightQuoteFormData {
  personal: PersonalInfo;
  service: ServiceRequirements;
  cargo: CargoInformation;
  volumetricWeight?: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  quoteId?: string;
}