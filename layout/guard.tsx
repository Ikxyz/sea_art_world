import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useWalletProviders } from '../context/WalletProvider';
import { RootState } from '../store';
import { gotoEmailVerification, gotoPhoneNumberVerification, gotoSetupPin } from '../store/slices/onboarding';
import { getAccount } from '@wagmi/core';

export function GotoDashboardIfAuthenticated(Component: any) {
  return function WithGuard(props: any) {

    const {  isConnected } = getAccount();

    const router = useRouter();

    if (typeof window !== 'undefined') {
      if (isConnected) {
        router.replace('/');
        return <></>
      }
    }

    return <Component {...props} />

  }
}


export function ProtectedRoute(Component: any) {
  return function WithProtection(props: any) {

    // const { accounts } = useWalletProviders();
    const {  isConnected } = getAccount();
    const router = useRouter();

    if (typeof window !== 'undefined') {

      if (!isConnected) {
        router.replace('/');
        return <></>
      }
    }

    return <Component {...props} />

  };


}
