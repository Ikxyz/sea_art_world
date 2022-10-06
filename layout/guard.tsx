import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreator } from 'redux';
import { useWalletProviders } from '../context/WalletProvider';
import { RootState } from '../store';
import { gotoEmailVerification, gotoPhoneNumberVerification, gotoSetupPin } from '../store/slices/onboarding';

export function GotoDashboardIfAuthenticated(Component: any) {
  return function WithGuard(props: any) {

    const { accounts } = useWalletProviders();

    const router = useRouter();

    if (typeof window !== 'undefined') {
      if (accounts.length > 0) {
        router.replace('/');
        return <></>
      }
    }

    return <Component {...props} />

  }
}


export function ProtectedRoute(Component: any) {
  return function WithProtection(props: any) {

    const { accounts } = useWalletProviders();
    const router = useRouter();

    if (typeof window !== 'undefined') {

      if (!accounts || accounts.length === 0) {
        router.replace('/');
        return <></>
      }
    }

    return <Component {...props} />

  };


}
