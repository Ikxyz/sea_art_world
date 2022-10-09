import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import onBoardingSlice, { gotoEmailVerification, gotoPhoneNumberVerification, gotoSetupPin } from './onboarding';
import Encrypt from '../../modules/encrypt';
import { IUser } from "../../@types/user";


interface IAuthState {
    isLoggedIn: boolean;
    token: string;
    user: IUser | null;
}

const initialState: IAuthState = {
    isLoggedIn: false,
    token: "",
    user: null,
}

export const USER_SESSION_KEY = Encrypt.hash("_USER_SESSION_KEY_");
export const TOKEN_SESSION_KEY = Encrypt.hash("_TOKEN_SESSION_KEY_");

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loadFromCache: (state: IAuthState) => {
            const userStr = sessionStorage.getItem(USER_SESSION_KEY);
            const token = sessionStorage.getItem(TOKEN_SESSION_KEY);
            if (userStr) {
                state.user = JSON.parse(userStr);
                state.token = token ?? "";
                state.isLoggedIn = !!token && !!userStr;
            }
        },
        onLogin: (state: IAuthState, action: PayloadAction<{ token: string, user: IUser }>) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;;
            sessionStorage.setItem(TOKEN_SESSION_KEY, token);
            sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
            state.isLoggedIn = token?.trim().length > 0;
        },
        onRegister: (state: IAuthState, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(action.payload));
        },
        onLogout: (state: IAuthState) => {
            state.token = "";
            state.user = null;
            state.isLoggedIn = false;
            sessionStorage.clear();
        }
    },

})

export const { onRegister, onLogin, onLogout, loadFromCache } = authSlice.actions;
export default authSlice.reducer;
