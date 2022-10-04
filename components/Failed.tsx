/* eslint-disable @next/next/no-img-element */
import PinField from "react-pin-field";
import BackButton from "./BackButton";
import Dialog from "./Dialog";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { closeAllDialog, closeDialog, goBackDialog } from "../store/slices/dialogs";
import Images from '../assets/images/index';
import CButton from "./Button";


interface IProps {
  open: boolean;
}

function Failed({ open }: IProps) {

  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeAllDialog());
  }

  return (
    <Dialog isOpened={open} bringToFront={80} >
      <div className="flex flex-col bg-white   w-[430px] rounded-3xl">
        <div className="flex items-center h-24 px-6 ">
          <BackButton color="#000" />
          <p className="mx-auto text-lg font-bold text-white"></p>
        </div>

        <div className="px-8 pt-4 pb-12 bg-white text-start ">
          <h3 className="mb-px text-xl font-bold">Enter wallet PIN</h3>
          <p className="text-grey-400">
            Provide PIN to finalize this wallet <br /> transaction
          </p>
          <br />
          <div className="flex items-center content-center justify-center space-x-3 no-increment-indicator">
            <img src={Images.success.src} alt="success" />
          </div>
          <br />
          <br />
          <CButton text="Close" onClick={close} type='button' />
          <br />
        </div>
      </div>
    </Dialog>
  );
}

export default Failed;
