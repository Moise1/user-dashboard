import { eCurrency } from '../eCurrency';

export enum ProductType {
  Subscription = 1,
  NoApiServer = 2,
  CatalogToken = 3,
  Others = 4,
  ListingService = 5,
  PriceWarrior = 6
}

export enum BillingPeriod {
  Monthly = 0,
  Biannually = 1,
  Yearly = 2,
  Unique = 3
}

export enum Platform {
  PayPal = 1,
  Stripe = 2
}

export interface Product {
  id: number;
  name: string;
  productOrder: number;
  prices: ProductPrice[];
  type: ProductType;
}

export interface ProductPrice {
  id: number;
  platformId: number;
  productId: number;
  productOrder: number;
  billingPeriodId: BillingPeriod;
  currencyId: eCurrency;
  price: number;
  platformProductId: string;
}

export interface StripeConfig {

  publishableKey: string;
  createCheckoutSessionUrl: string;
  successUrl: string;
  cancelUrl: string;
}

export interface PayPalConfig {
  userId: string;
}

export interface CreateCheckoutSessionRequest {
  lineItems: LineItem[];
  mode: string; // payment, setup, subscription
  successUrl: string;
  cancelUrl: string;
  upgradingSubscription: boolean;
}

export interface CreateCheckoutSessionResponse {
  checkoutSessionId: string;
  alreadyDone: boolean;
}

export interface LineItem {
  platformProductId: string;
  quantity: number;
}

export interface UserSubscriptionProduct {
  id: number;
  name: string;
  productTypeId: ProductType;
  productOrder: number;
  productId: number;
  platformId: Platform;
  billingPeriodId: BillingPeriod;
  currencyId: eCurrency;
  price: number;
  platformProductId: string;
  startedOn: string;
  endedOn: string;
}
