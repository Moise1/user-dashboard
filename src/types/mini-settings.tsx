
export interface MiniSettings {
  paymentProfileId?: number;
  templateId?: number;
  fee?: number;
  markup?: number;
  monitorStock?: boolean;
  monitorPrice?: boolean;
  monitorPriceDecrease?: boolean;
  monitorPriceDecreasePercentage?: number;
  dispatchDays?: number;
  primeOnly?: boolean;
  minQuantity?: number;
  ignoreRules?: boolean;
  customCategory?: number;
  notes?: string;
  gsp?: boolean;
  returnsPolicy?: string;
  defaultShipping?: string;
  locationCity?: string;
  locationPostcode?: string;
  locationCountry?: string;
  returnProfileId?: number;
  shippingProfileId?: number;
}
