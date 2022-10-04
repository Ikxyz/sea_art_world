import PinField from "react-pin-field";
import BackButton from "./BackButton";
import Dialog from "./Dialog";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { closeDialog, goBackDialog } from "../store/slices/dialogs";
import Icons from "../assets/icons/icons";
import CButton from "./Button";
import { useState } from 'react';


interface IProps {
  onComplete: (pin: number | null) => void;
  pinLength?: number;
  isOpen: boolean;
}

function GetPin({ isOpen, pinLength = 4, onComplete }: IProps) {

  const [code, setCode] = useState('');
  // const dispatch = useDispatch();

  const close = () => {
    onComplete(null);
  }

  console.log('renderrrr')

  const pinComplete = () => {
    if (!code || code.length !== pinLength) return close();

    onComplete(Number(code));
  }

  return (
    <Dialog isOpened={isOpen} bringToFront={80} onClose={close}>
      <div className="flex flex-col bg-white   w-[450px] rounded-3xl">
        <div className="flex items-center h-24 px-6 ">
          <BackButton color="#000" onClick={close} />
          <p className="mx-auto text-lg font-bold text-white"></p>
        </div>

        <div className="px-8 pt-4 pb-12 bg-white text-start ">
          <h3 className="mb-px text-xl font-bold">Enter wallet PIN</h3>
          <p className="text-grey-400">
            Provide PIN to finalize this wallet <br /> transaction
          </p>
          <br />

          <div className="flex flex-wrap items-center content-center justify-center space-x-1 no-increment-indicator">
            <PinField
              length={pinLength}
              type="password"
              onChange={setCode}
              required placeholder={pinLength > 4 ? '' : "🔴"}
              className={` text-center bg-rose-100 bg-opacity-30 rounded-2xl outline-none  focus:outline-0 shadow-none focus:shadow-none focus:ring-0  text-xl ${pinLength > 4 ? 'w-[55px] h-[55px]  placeholder:text-[5px]' : 'w-[75px] h-[75px]  placeholder:text-lg'} `}

            />
          </div>

          <br />
          <br />

          <CButton text='Continue' type="button" onClick={pinComplete} icon={Icons.next.src} />

          <br />
        </div>
      </div>
    </Dialog>
  );
}

export default GetPin;
