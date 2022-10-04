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
  pinLength?: number;
  open: boolean;
}

function Success({ open }: IProps) {

  const { isOpen, data } = useSelector((e: RootState) => e.dialogs.state.success);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(closeAllDialog());
  }

  return (
    <Dialog isOpened={open} bringToFront={80}>
      <div className="flex flex-col bg-white   w-[430px] rounded-3xl box-border">
        <div className="flex items-center h-24 px-6 bg-red">
          <p className="mx-auto text-lg font-bold text-white">Success</p>
        </div>

        <div className="px-8 pt-4 pb-12 bg-white text-start box-border">

          <br />

          <div className="flex flex-col items-center content-center box-content justify-center space-x-3 no-increment-indicator">
            <img className="w-32 h-32" src={Images.success.src} alt="success" />
            <br />
            <br />

            <h3 className="mb-px text-xl font-bold">{data?.title ?? ''}</h3>
            <p className="text-grey-400">
              {data?.desc ?? ''}
            </p>
          </div>
          <CButton text="close" onClick={onClose} />

          <br />


        </div>
      </div>
    </Dialog>
  );
}

export default Success;
