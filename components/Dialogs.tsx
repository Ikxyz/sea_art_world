import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store'
import { closeDialog, openDialog, updateDialogData } from '../store/slices/dialogs'

import GetPin from './GetPin';
import RenderIf from './RenderIf'

import Success from './Success';
import Failed from './Failed';

export default function Dialogs() {
  const dispatch = useDispatch();
  const { state: { success, failed } } = useSelector((root: RootState) => root.dialogs)

  const onCryptoFundingComplete = () => {
    dispatch(closeDialog('crypto_funding'));
  }



  const onCalculatorComplete = () => {
    dispatch(closeDialog('calculator'));
  }

  const onSwapComplete = () => {
    dispatch(closeDialog('swap'));
  }




  const onBillComplete = () => {
    dispatch(closeDialog('pay_bills'));
  }

  const onFundAccountAmountDialogComplete = () => {
    dispatch(updateDialogData({ dialog: { fund_account_amount_via_fiat: { isOpen: false, data: { method: 'voucher' } } } }));
    // dispatch(closeDialog('fund_account_amount_via_fiat', data: 0 }));
  }





  return (
    <>
      <RenderIf isTrue={success.isOpen}>
        < Success open={success.isOpen} />
      </RenderIf>
      <RenderIf isTrue={failed.isOpen}>
        < Failed open={failed.isOpen} />
      </RenderIf>


    </>
  )
}
