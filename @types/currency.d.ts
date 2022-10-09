

export interface IMarketStatices {
     _id: string,
     currencyId: string,
     currencyName: string,
     currencyCode: string,
     lastUsdPrice: number,
     currentUsdPrice: number,
     lastNairaPrice: number,
     currentNairaPrice: number,
     growthRate: number,
     createdAt: string,
     updatedAt: string,
     __v: number,
     logoUrl: string,
     id: string
}



export default interface ICurrency {
     isActive: boolean,
     description: string,
     minAmount: number,
     maxAmount: number,
     useDefaults: string,
     decimals: number,
     defaultSellRate: number,
     defaultBuyRate: number,
     logoUrl: string,
     _id: string,
     name: string,
     code: string,
     id: string,
     createdAt: string,
     updatedAt: string,
     __v: number,
     network: string[]
}