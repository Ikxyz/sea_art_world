import { response } from './auth';
import { HttpStandardResponse } from './index';
import { IUser } from "../user";



namespace IAuthRequestBody {



  export namespace Login {

    export type request = {
      emailOrPhone: string;
      pin: string;
    }

    export type response = HttpStandardResponse<{ user: IUser, token: string }>
  }

  export interface LoginExistingAccount {
    email: string;
  }

  export interface SocialLogin {
    email: string;
    oauthType: string;
  }

  export interface VerifyEmail {
    userId: string;
    otp: number;
  }

  export interface VerifyPhoneNumber {
    userId: string;
    otp: number;
  }

  export interface SetPin {
    userId: string;
    pin: number;
  }

  export interface ForgotPin {
    emailOrPhone: string;
  }

  export interface ResetPin {
    otp: number;
    pin: number;
  }

  export interface SubmitAddress {
    state: string;
    street: string;
    lga: string;
    landmark: string;
  }
  export namespace VerifyPhone {
    export type request = { userId: string, otp: string };
    export type response = HttpStandardResponse<IUser>;
  }

  export namespace VerifyEmail {
    export type request = { userId: string, otp: string };
    export type response = HttpStandardResponse<IUser>;
  }

  export namespace LoginExistingAccount {
    export type request = { email: string };
    export type response = HttpStandardResponse<{ token: string | null, user: IUser }>
  }

  export interface UpdateProfile extends IUser { }

  export namespace SetPin {
    export type request = { userId: string, pin: string }
    export type response = HttpStandardResponse<{ token: string, user: IUser }>
  }

  export interface ChangePin {
    currentpin: number;
    newpin: number;
  }

  export interface VerifyIdentity {
    idnumber: string;
    idtype: string;
    dob: string;
  }

  export interface VerifySelfie {
    image: string;
  }

  export interface UpdateAddress extends IUser { }
  π
  export namespace Register {

    export type request = {
      firstName: string;
      lastName: string;
      email: string;
      telephone: string;
    }

    export type response = HttpStandardResponse<IUser>
  }

  export interface ChangePassword {
    currentpassword: string;
    newpassword: string;
  }

  export interface ForgotPassword {
    email: string;
  }

  export interface ResetPassword {
    resettoken: string;
    password: string;
  }

  export interface UpdateProfile { }
}

export default IAuthRequestBody;
