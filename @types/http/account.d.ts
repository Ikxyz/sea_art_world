namespace IAccountRequestEndpoint {
    export interface Beneficiary {
        accountName: string;
        accountNumber: number;
        bankCode: string;
    }
    export interface DeleteBeneficiary {
        beneficiaryId: string;
    }
    export interface Verify {
        accountNumber: number;
        bankCode: string;
    }
    export interface Beneficiaries { }
    export interface BankList { }
}

export default IAccountRequestEndpoint