export interface CheckoutData {
  personalInfo: PersonalInfo;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  orderSummary: OrderSummary;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'credit_card' | 'paypal' | 'bank_transfer';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  items: CheckoutItem[];
}

export interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}