import { response } from './auth';
import { HttpStandardResponse } from './index';
import ICurrency from '../currency';
namespace ICurrencyRequest {

     export namespace Currencies {
          export type request = void;
          export type response = HttpStandardResponse<Array<ICurrency>>
     }

     export namespace CurrencyRate {
          export type request = string;
          export type response = HttpStandardResponse<>
     }

     export namespace MarketStatices {
          export type request = void;
          export type response = HttpStandardResponse<Array<IMarketStatices>>
     }
}


export default ICurrencyRequest;