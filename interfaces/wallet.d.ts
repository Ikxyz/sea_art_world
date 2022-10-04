

export interface IWalletPrices {
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
     id: string,
}

export interface IWalletHistory {
     "_id": string,
     "userId": string,
     "walletId": string,
     "type": string,
     "credit": number,
     "debit": number,
     "description": string,
     "createdAt": string,
     "updatedAt": string,
     "__v": number,
}

export default interface IWallet {
     _id: string,
     userId: string,
     currencyId: string,
     currencyCode: string,
     walletAddress: string,
     isActive: boolean,
     id: string,
     createdAt: string,
     updatedAt: string,
     balance: number,
     __v: number,
     prices?: IWalletPrices,
     history?: IWalletHistory,
     // Added During Transform
     logoUrl: string,
}