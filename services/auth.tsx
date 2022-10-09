import { createApi } from "@reduxjs/toolkit/query/react";
import EndPoints from "../constants/endpoints";
import IAuthRequestBody from "../@types/http/auth";
import BaseQuery from "./base";



const Urls = EndPoints.Auth;


const AuthApi = createApi({
    reducerPath: "AuthApi",
    baseQuery: BaseQuery,
    endpoints: (builder) => ({

        login: builder.mutation<IAuthRequestBody.Login.response, IAuthRequestBody.Login.request>({
            query: (payload) => ({ url: Urls.login, method: 'post', body: payload })
        }),


        register: builder.mutation<IAuthRequestBody.Register.response, IAuthRequestBody.Register.request>({
            query: (payload) => ({ url: Urls.register, method: 'post', body: payload, }),
        }),

        changePassword: builder.mutation({
            query: (payload: IAuthRequestBody.ChangePassword) => ({ url: Urls.changePassword, method: 'post', body: payload })
        }),


        forgotPassword: builder.mutation({
            query: (payload: IAuthRequestBody.ForgotPassword) => ({ url: Urls.forgotPassword, method: 'post', body: payload })
        }),


        resetPassword: builder.mutation({
            query: (payload: IAuthRequestBody.ResetPassword) => ({ url: Urls.resetPassword, method: 'post', body: payload })
        }),


        updateProfile: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.updateProfile, method: 'post', body: payload })
        }),


        loginExistingAccount: builder.mutation<IAuthRequestBody.LoginExistingAccount.response, IAuthRequestBody.LoginExistingAccount.request>({
            query: (payload) => ({ url: Urls.loginExistingAccount, method: 'post', body: payload })
        }),


        loginSocial: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.loginSocial, method: 'post', body: payload })
        }),

        verifyEmail: builder.mutation<IAuthRequestBody.VerifyEmail.response, IAuthRequestBody.VerifyEmail.request>({
            query: (payload) => ({ url: Urls.verifyEmail, method: 'post', body: payload })
        }),


        verifyPhone: builder.mutation<IAuthRequestBody.VerifyPhone.response, IAuthRequestBody.VerifyPhone.request>({
            query: (payload) => ({ url: Urls.verifyPhone, method: 'post', body: payload })
        }),


        setPin: builder.mutation<IAuthRequestBody.SetPin.response, IAuthRequestBody.SetPin.request>({
            query: (payload) => ({ url: Urls.setPin, method: 'post', body: payload })
        }),


        forgotPin: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.forgotPin, method: 'post', body: payload })
        }),


        resetPin: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.resetPin, method: 'post', body: payload })
        }),


        submitAddress: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.submitAddress, method: 'post', body: payload })
        }),


        changePin: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.changePin, method: 'post', body: payload })
        }),


        verifyIdentity: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.verifyIdentity, method: 'post', body: payload })
        }),


        verifySelfie: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.verifySelfie, method: 'post', body: payload })
        }),


        profile: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.profile, method: 'get', body: payload })
        }),


        address: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.address, method: 'get', body: payload })
        }),


        refreshToken: builder.mutation({
            query: (payload: IAuthRequestBody.UpdateProfile) => ({ url: Urls.refreshToken, method: 'get', body: payload })
        }),

    }),
});

export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useChangePasswordMutation, useResetPasswordMutation, useUpdateProfileMutation, useLoginExistingAccountMutation, useLoginSocialMutation, useVerifyEmailMutation, useVerifyPhoneMutation, useSetPinMutation, useForgotPinMutation, useResetPinMutation, useSubmitAddressMutation, useChangePinMutation, useVerifyIdentityMutation, useVerifySelfieMutation, useProfileMutation, useAddressMutation, useRefreshTokenMutation } = AuthApi;
export default AuthApi;