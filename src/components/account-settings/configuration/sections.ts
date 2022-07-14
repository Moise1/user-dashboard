export enum AccountSettingSection {
  BillingAddress,
  PaymentMethod,
}

interface AccountSettingSectionsInfo {
  Type: AccountSettingSection;
  Label: string;
  ChannelIds?: number[]; //If undefined it accepts all the channels
}

export const AccountSettingSections: AccountSettingSectionsInfo[] = [
  {
    Type: AccountSettingSection.BillingAddress,
    Label: 'Account.BillingAddress'
  },
  {
    Type: AccountSettingSection.PaymentMethod,
    Label: 'Account.PaymentMethod'
  }
];
