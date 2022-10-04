
const Host = process.env.NODE_ENV === "production" ? "https://tradefada-mobile-api.azurewebsites.net" : "https://tradefada-mobile-api-staging.azurewebsites.net";


class Config {

    base = "/config";

    transactionSettings = this.base + "/transaction-settings";

}

class Currency {
    base = "/currencies";
    getCurrencies = this.base + "";
    getCurrencyRate = this.base + "/rate/";
    getMarketStatices = this.base + "/market-statistics";
}
class Auth {
    base = "/auth";
    login = this.base + "/login"
    register = this.base + "/register"
    forgotPassword = this.base + "/forgotpassword"
    changePassword = this.base + "/changepassword"
    resetPassword = this.base + "/resetpassword"
    loginExistingAccount = this.base + "/login/existing-account"
    loginSocial = this.base + "/login/social"
    verifyEmail = this.base + "/verify-email"
    verifyPhone = this.base + "/verify-phone"
    setPin = this.base + "/setpin"
    forgotPin = this.base + "/forgot-pin"
    resetPin = this.base + "/reset-pin"
    submitAddress = this.base + "/submit-address"
    updateProfile = this.base + "/update-profile"
    changePin = this.base + "/change-pin"
    verifyIdentity = this.base + "/verify-identity"
    verifySelfie = this.base + "/verify-selfie"
    profile = this.base + "/profile"
    address = this.base + "/address"
    refreshToken = this.base + "/refresh-token"

}

class Account {

    base = Host + "/account";
    Beneficiary = this.base + "/beneficiary";
    Verify = this.base + "/verify";
    Beneficiaries = this.base + "/beneficiaries";
    BankList = this.base + "/bank-list";

}

class Otp {
    base = Host + "/otp";
    send = this.base + "/send";
    verify = this.base + "/verify";
}

class Transaction {

    base = Host + "/transaction";
    depositCallback = this.base + "/deposit-callback";
    depositLink = this.base + "/deposit-link";
    initiateDeposit = this.base + "/initiate-deposit";
    completeDeposit = this.base + "/complete-deposit";
    initiateWithdrawal = this.base + "/initiate-withdrawal";
    completeWithdrawal = this.base + "/complete-withdrawal";
    withdrawalResendOtp = this.base + "/withdrawal/resend-otp/";
    internalSell = this.base + "/internal-sell";
    externalSell = this.base + "/external-sell";
    internalBuy = this.base + "/internal-buy";
    externalBuy = this.base + "/external-buy";
    coinTransfer = this.base + "/coin-transfer";
    transactions = this.base + "/user";

}

export class Wallet {

    base = Host + '/wallet';
    create = this.base + "/create";
    nairaBalance = this.base + "/naira-balance";
    balance = this.base + "/balance/";
    balances = this.base + "/balances";
    history = this.base + "/history/";


}


class Location {
    base = Host + "/location";
    states = this.base + "/states";
    lga = this.base + "/lga";

}


class Voucher {
    base = Host + "/voucher";
    initiateRedemption = this.base + "/initiate-redemption";
    completeRedemption = this.base + "/complete-redemption";
    resendOtp = this.base + "/resend-otp";

}


const EndPoints = {
    base: Host,
    Config: new Config(),
    Currency: new Currency(),
    Auth: new Auth(),
    Account: new Account(),
    Otp: new Otp(),
    Transaction: new Transaction(),
    Wallet: new Wallet(),
    Location: new Location(),
    Voucher: new Voucher(),
    getHeaders(token: String, xAccess: String) {
        return { Authorization: "Bearer " + xAccess, "x-access-token": token };
    },
}


export default EndPoints;