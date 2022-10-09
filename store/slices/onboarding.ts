import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IAuthRequestBody from '../../@types/http/auth';
import { IUser } from '../../@types/user';

export type TOnboardingSteps = "create-account" | "phone-verification" | "email-verification" | "setup-pin" | "repeat-pin" | "welcome" | "existing-account" | "login"



interface IState {
    step: TOnboardingSteps,
    isPasswordMatch: boolean,
    auth: { user: IUser | null, token: string | null },
    registerData: IAuthRequestBody.Register.request,
    telOtpCode: number,
    emailOtpCode: string,
    setupPin: string,
    repeatSetupPin: string,
    isSetupPinMatch: boolean,
}


const initialState: IState = {
    step: "create-account",
    isPasswordMatch: true,
    telOtpCode: 0,
    emailOtpCode: "",
    setupPin: "",
    repeatSetupPin: "",
    isSetupPinMatch: false,
    auth: { user: null, token: "" },
    registerData: {
        firstName: "",
        lastName: "",
        telephone: "",
        email: "",
    },

}

const onBoardingSlice = createSlice({
    name: 'onboarding_slice', initialState, reducers: {
        gotoCreateAccount: (state: IState) => {
            state.step = "create-account";
        },
        gotoPhoneNumberVerification: (state: IState) => {
            state.step = "phone-verification";
        },
        gotoEmailVerification: (state: IState) => {
            state.step = "email-verification";
        },
        gotoSetupPin: (state: IState) => {
            state.step = "setup-pin";
        },
        gotoRepeatPin: (state: IState) => {
            state.step = "repeat-pin";
        },
        gotoWelcome: (state: IState) => {
            state.step = "welcome";
        },
        gotoExistingAccount: (state: IState) => {
            state.step = "existing-account";
        },
        gotoLoginAccount: (state: IState) => {
            state.step = "login";
        },

        checkOnboardingProgress: (state: IState, action: PayloadAction<{ user: IUser, token: string | null }>) => {
            const { user, token } = action.payload;
            state.auth = action.payload;
            if (!user.isPhoneVerified) {
                state.step = "phone-verification";
            } else if (!user.isEmailVerified) {
                state.step = "email-verification";
            } else if (!user.hasPin) {
                state.step = "setup-pin";
            } else {
                state.step = "welcome";
            }
            console.log(state.step);

        },

        checkPasswordMatch: (state: IState) => {
            // state.isPasswordMatch = state.formData.password === state.formData.confirmPassword;
        },
        onRegisterFormDataChange: (state: IState, action: PayloadAction<IAuthRequestBody.Register.request>) => {
            state.registerData = { ...state.registerData, ...action.payload };
        },
        onEnterTelOtpCode: (state: IState, action: PayloadAction<string>) => {
            if (!action.payload) return;
            state.telOtpCode = Number(action.payload);
        },

        onEnterEmailOtpCode: (state: IState, action: PayloadAction<string>) => {
            if (!action.payload) return;
            state.emailOtpCode = action.payload;
        },
        onEnterSetupPin: (state: IState, action: PayloadAction<string>) => {
            if (!action.payload) return;
            state.setupPin = action.payload;
        },
        onEnterRepeatSetupPin: (state: IState, action: PayloadAction<string>) => {
            if (!action.payload) return;
            state.repeatSetupPin = action.payload;
        },
    }
})



export const { gotoCreateAccount, gotoLoginAccount, checkOnboardingProgress, gotoPhoneNumberVerification, gotoEmailVerification, gotoSetupPin, gotoRepeatPin, gotoWelcome, checkPasswordMatch, onRegisterFormDataChange, onEnterTelOtpCode, onEnterEmailOtpCode, onEnterSetupPin, onEnterRepeatSetupPin, gotoExistingAccount } = onBoardingSlice.actions;
export default onBoardingSlice.reducer;
