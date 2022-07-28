export enum AutoOrderingError {
    Unknown = 0,
    Login = 1,//Bad user or password 
    TwoFA = 2,//TwoFA problem (we need a valid OTP)
    Verification = 3,//Similar to TwoFA but we can't solve it just with a OPT but with a code send to an email or phone)
    UserActionRequired = 4, //The store wants user to perform an action and we can't do anything until it is done
    Captcha = 5,//Unable to solve the captcha
    Suspended = 6,//Suspended account
    HighPrice = 7,//Price is higher than max
    OutOfStock = 8,//OutOfStock or there is no primeOption if OnlyPrime is true
    Timeout = 9,//Some action or webpage is not responding
    UnknownJavascriptError = 10,
    InvalidShippingAddress = 11,//Invalid shiping address
    Payment = 12,//Unkonwn payment problem
    NoGiftCards = 13,//The only way to pay is with gifcards and there is a problem
    InvalidCard = 14,//Invalid card, no founds in the card, etc.
    NoCard = 15,//User has not configured the card in the store
    CardVerification = 16,//Store is asking to verify this card and we can't not complete it
    NoBillingAddress = 17,//User has not configured the biling address in the store
    ImportedWithError = 18,//There were some problem when importing the order
    MaxBuyLimit = 19,//The store doens't let us to buy more from this item
    MinBuyLimit = 20,//The store asks us to buy more items than we want to buy (for example, we want to buy one item but the store wants us to buy min quantity 2)
    WrongGiftFrom = 21,
    WrongGiftMessage = 22,
    InvalidBillingAddress = 23,
    NoPaypal = 24,//User wants to use paypal as payment method but paypal method is not saved in the store
    NoWallet =25//Empty or not enought balance
}