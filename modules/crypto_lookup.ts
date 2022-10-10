
import axios from "axios";

export default class CryptoLookup {


     static async getEthEquivalent(amount: number) {
          const url = "https://api.coinbase.com/v2/exchange-rates?currency=ETH";

          const result = await axios.get(url);

          let usdt = Number(result?.data.data?.rates?.USDT ?? '0');


          if (typeof usdt !== "number") return { currentUSDAmount: 0, amountInEth: 0 };

          return { currentUSDAmount: Number(usdt), amountInEth: Number(amount) / usdt };
     }
}