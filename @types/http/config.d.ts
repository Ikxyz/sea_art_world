import { response } from './auth';
import { HttpStandardResponse } from './index';
namespace IConfigRequest {


     export namespace TransactionSettings {

          export type request = void;

          export type response = HttpStandardResponse<{
               swapFee: number,
               transactionFee: number,
               withdrawalFee: number,
               transferFee: number,
               tradetypes: Array<{
                    isActive: boolean,
                    _id: string,
                    tradeType: string,
                    createdAt: string,
                    updatedAt: string,
                    __v: number
               },>,
               payoutOptions: Array<{
                    isActive: boolean,
                    _id: string,
                    name: string,
                    createdAt: string,
                    updatedAt: string,
                    __v: number
               },>

          }>

     }


}

export default IConfigRequest;