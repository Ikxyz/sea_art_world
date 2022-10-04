import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreator } from 'redux';
import { RootState } from '../store';
import { gotoEmailVerification, gotoPhoneNumberVerification, gotoSetupPin } from '../store/slices/onboarding';

export function GotoDashboardIfAuthenticated(Component: any) {
  return function WithGuard(props: any) {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

    const router = useRouter();

    const completeOnboarding = (action: ActionCreatorWithoutPayload) => {
      dispatch(action());
      router.replace('/register');
    }

    if (typeof window !== 'undefined') {
      if (isLoggedIn && user !== null) {
        if (user.isEmailVerified !== true)
          completeOnboarding(gotoEmailVerification);
        else if (user.isPhoneVerified !== true)
          completeOnboarding(gotoPhoneNumberVerification);
        else if (user.hasPin !== true)
          completeOnboarding(gotoSetupPin);
        else router.replace('/home');

        return <></>
      }
    }

    return <Component {...props} />

  }
}


export function ProtectedRoute(Component: any) {
  return function WithProtection(props: any) {

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);

    const router = useRouter();

    if (typeof window !== 'undefined') {
      if (!isLoggedIn) {

        router.replace('/login');
        return <></>
      }
    }

    return <Component {...props} />

  };


}
