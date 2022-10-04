import { response } from './transaction';
import { HttpStandardResponse } from './index';
namespace IVoucherRequestBody {
    export namespace InitiateRedemption {

        export type request = {
            voucherNumber: number;
            bankCode: string;
            accountNumber: number;
        }
        export type response = HttpStandardResponse<{
            Reference: string,
            Status: string,
            AccountDetails: {
                AccountNumber: string,
                AccountName: string,
                AccountBank: string,
            },
            Amount: number,
            Expiry: number,
            Currency: string,
        }>

    }

    export interface CompleteRedemption {
        reference: string;
        otp: number;
    }

    export interface ResendOtp {
        reference: string;
    }
}

export default IVoucherRequestBody;