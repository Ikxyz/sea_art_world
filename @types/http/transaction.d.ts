import ITransaction from '../transaction';
import { HttpStandardResponse } from './index';
namespace ITransactionRequestBody {
  export interface DepositCallback {
    walletAddress: string;
    amount: number;
  }
  export namespace DepositLink {
    export type request = { amount: number }
    export type response = HttpStandardResponse<{
      TotalPrice: number,
      Currency: string,
      OrderReference: string,
      Status: string,
      TotalCreationFee: number,
      UnitCreationFee: number,
      TotalVouchers: number,
      EmailAddress: string,
      FullName: string,
      PaymentURL: string,
    }>

  }

  export namespace Transactions {
    export type request = void;
    export type response = HttpStandardResponse<Array<ITransaction>>
  }
  export namespace InitiateDeposit {
    export type request = {
      cardno: string;
      cvv: string;
      pin: string;
      expirymonth: string;
      expiryyear: string;
      amount: number;
    }
    export type response = HttpStandardResponse<{
      id: number,
      txRef: string,
      orderRef: string,
      flwRef: string,
      redirectUrl: string,
      device_fingerprint: string,
      settlement_token: null,
      cycle: string,
      amount: number,
      charged_amount: number,
      message?: string,
      appfee: number,
      merchantfee: number,
      merchantbearsfee: number,
      chargeResponseCode: string,
      raveRef: string,
      chargeResponseMessage: string,
      authModelUsed: string,
      currency: string,
      IP: string,
      narration: string,
      status: "success-pending-validation" | string,
      modalauditid: string,
      vbvrespmessage: string,
      authurl: string,
      vbvrespcode: string,
      acctvalrespmsg: string,
      acctvalrespcode: null,
      paymentType: string,
      paymentPlan: null,
      paymentPage: null,
      paymentId: string,
      fraud_status: string,
      charge_type: string,
      is_live: number,
      retry_attempt: null,
      getpaidBatchId: null,
      createdAt: string,
      updatedAt: string,
      deletedAt: null,
      customerId: number,
      AccountId: number,
      customercandosubsequentnoauth: boolean
    }>
  }
  export namespace CompleteDeposit {
    export type request = {
      reference: string;
      otp: number;
    }
    export type response = HttpStandardResponse<ITransaction>
  }
  export interface InitiateWithdrawal {
    amount: number;
    paymentMode: "PEER2PEER" | "VOUCHER";
    accountName?: string;
    bankCode?: string;
    accountNumber: number;
    pin: number;
  }
  export namespace CompleteWithdrawal {
    export type request = {
      reference: string;
      otp: number;
    }
    export type response = HttpStandardResponse<ITransaction>
  }
  export interface WithdrawalResendOtp {
    reference: string;
  }
  export namespace InternalSell {
    export type request = {
      amount: number;
      walletId: string;
      pin: string;
      askRate: number;
    }
    export type response = HttpStandardResponse<{
      nairaBalance: number,
      walletBalance: number,
      transaction: ITransaction
    }>
  }
  export interface ExternalSell {
    currency: string;
    currencyId: string;
    amount: number;
    walletAddress: string;
    paymentMode?: "PEER2PEER" | "VOUCHER";
    accountName?: string;
    accountNumber?: number;
    bankCode?: string;
  }
  export namespace InternalBuy {
    export type request = {
      amount: number;
      walletId: string;
      pin: string;
      askRate: number;
    }
    export type response = HttpStandardResponse<{
      nairaBalance: number,
      walletBalance: number,
      transaction: ITransaction
    }>
  }
  export interface ExternalBuy {
    pin: number;
    currency;
    amount: number;
    walletAddress: string;
  }
  export interface CoinTransfer {
    pin: number;
    walletId: string;
    amount: number;
    walletAddress: string;
  }
  export interface User { }
}

export default ITransactionRequestBody;
