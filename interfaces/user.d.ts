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