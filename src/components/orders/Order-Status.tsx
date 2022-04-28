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
