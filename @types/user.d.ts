

export type UserAccountStatus = "active" | "disabled" | "suspended";

export default interface UserModel {
    firstName: string;
    uid: string;
    lastName: string;
    email: string;
    wallet: string;
    balance?: number;

    status?: UserAccountStatus;
    lastLogin?: DateTime;
    verificationLevel?: number;
    referral?: string;
    password?: string;
    profileUrl?: string;
    isAdmin: boolean;
    isDeleted?: boolean;
    confirmPassword?: string;

    ip?: IPInfo;
    notification?: {
        loginNotification: boolean;
        withdrawNotification: boolean;
    };
    security?: {
        tfa: boolean;
    };
    kyc?: {
        tel: string;
        address: string;

        country: string;
    };
    verification?: {
        governmentId: string;
        passportVerification: string;
        emailVerification: string;
    };
}



export type TVerificationType = 'passport' | 'id';
export type TVerificationStatus = 'verified' | 'declined' | 'pending' | 'not verified';
export interface IVerification {
    id: string,
    verified: TVerificationStatus,
    type: TVerificationType,
    url: string, uid: string, timestamp: number
}
export interface IUser {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    telephone?: string;
    dob?: string;
    pin?: string;
    selfie?: string;
    regMode?: string;
    status?: "blocked" | "active";
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    isAddressVerified?: boolean;
    isIdVerified?: boolean;
    hasPin?: boolean;
    verifiedSelfie?: boolean;
    isBlacklisted?: boolean;
}