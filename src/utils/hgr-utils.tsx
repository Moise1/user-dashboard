import { PriceRule } from '../redux/pricing-rules/rulesSlice';

export const HGRUtils = {
  GetMarkupFromPricingRules: (sourcePrice: number, rules: PriceRule[]) => {
    let newMarkup: number | null = null;
    for (const pr of rules) {
      if (!pr.active) continue;

      if (pr.priceTo != null) {
        if (pr.priceFrom != null) {
          if (pr.priceFrom <= sourcePrice && sourcePrice <= pr.priceTo) {
            newMarkup = pr.markup;
          }
        } else {
          if (sourcePrice <= pr.priceTo) {
            newMarkup = pr.markup;
          }
        }
      } else {
        if (pr.priceFrom != null) {
          if (pr.priceFrom <= sourcePrice) {
            newMarkup = pr.markup;
          }
        } else {
          newMarkup = pr.markup;
        }
      }
    } //Last pricingrule will rule
    return newMarkup; //If no pricingrule has been applied, we return null
  }
};