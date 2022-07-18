// import { SuccessBtn,WarningBtn, CancelBtn } from '../components/small-components/ActionBtns';
import { SuccessBtn, WarningBtn, ProgressBtn, DangerBtn } from '../small-components/ActionBtns';

export const determineStatus = (statusValue: string | number) => {
  switch (statusValue) {
    case 0:
      return <WarningBtn>A.O Disabled</WarningBtn>;
    case 1:
      return <ProgressBtn>In Progress</ProgressBtn>;
    case 1000:
      return <SuccessBtn>Checkout </SuccessBtn>;
    case 2000:
      return <SuccessBtn>Dispatched</SuccessBtn>;
    case 2100:
      return <SuccessBtn>Manually Dispatched</SuccessBtn>;
    case 3000:
    case 3100:
    case 3200:
      return <DangerBtn>View Error</DangerBtn>;
    default:
      break;
  }
};

export enum OrderStatus {
  Unkown = 0,
  Unshipped = 1,
  Shipped = 2,
  Cancelled = 3
}

export enum AutoOrderingState {
  AutoorderingDisabled = 0,//Initial state, When imported autoordering was disabled
  AutoorderingPrepared = 1,//Initial state, waiting for autoordering
  PlacingOrder = 50,//AutoOrdering placing order

  Loging = 100,
  Solving2FA = 150,//Using OTP code
  FillingCart = 200,//Puting items in cart
  CheckingPrice = 300,//Checking Price
  PlacingAddress = 400,//Placing Address
  PlacingPayment = 500,//Introducing card
  ChoosingBestOption = 600,//Choosing best option
  CheckingPriceAndDelivery = 650,//If there is only one option we will use this state to check the price aand delivery

  GoingToBuy = 1000,//Just before clicking the last  button, after it, the buy will be done
  Bought = 1100,//Already bought

  CompletedAutoOrder = 1300,//AutoOrder is completed but maybe we need to do more actions like generate a tracking id

  LastSteps = 1400,
  Completed = 2000,
  ManuallyDispatched = 2100,//Not bought by HGR

  TemporaryError = 3000, //Something has prevented buying the order, we will retry
  PermanentError = 3100, //Unrecoverable error, possibly need user action
  GoingToBuyError = 3200//Just before clicking, an unexpected error happened so we don't know if it has been bought or not
}