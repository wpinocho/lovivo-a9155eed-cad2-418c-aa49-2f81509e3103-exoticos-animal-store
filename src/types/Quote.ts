export interface QuoteRequest {
  animalId: number;
  quantity: number;
  location: Location;
  includeSetup: boolean;
  includeInsurance: boolean;
}

export interface Location {
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

export interface QuoteResult {
  animalId: number;
  animalName: string;
  basePrice: number;
  quantity: number;
  subtotal: number;
  shippingCost: number;
  permitCost: number;
  setupCost: number;
  insuranceCost: number;
  taxRate: number;
  taxes: number;
  total: number;
  estimatedDelivery: string;
  specialRequirements: string[];
}

export interface ShippingZone {
  name: string;
  countries: string[];
  baseCost: number;
  perAnimalCost: number;
  deliveryDays: number;
  restrictions: string[];
}