import { HttpStandardResponse } from './index';
import IWallet from "../wallet";

namespace IWalletRequestBody {


    export namespace Create {
        export type request = { currencyId: string };
        export type response = HttpStandardResponse<{
            "userId": string,
            "currencyId": string,
            "currencyCode": string,
            "walletAddress": string,
            "isActive": boolean,
            "_id": string,
            "id": string,
            "createdAt": string,
            "updatedAt": string,
            "__v": number
        }>
    }

    export namespace Wallets {
        export type request = void;
        export type response = HttpStandardResponse<Array<IWallet>>
    }

    export namespace NairaBalance {
        export type request = void;
        export type response = HttpStandardResponse<{ "nairaBalance": number }>
    }

    export namespace Balance {
        export type request = void;
        export type response = HttpStandardResponse<IWallet>
    }

    export namespace Balances {
        export type request = void;
        export type response = HttpStandardResponse<Array<IWallet>>
    }

    export namespace History {
        export type request = void;
        export type response = HttpStandardResponse<Array<IWallet>>
    }

}

export default IWalletRequestBody;