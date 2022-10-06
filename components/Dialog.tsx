import { Dialog as CDialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeAndRemove, closeAndRemoveAllDialog, closeDialog, TDialogId } from '../store/slices/dialogs';

interface IPram {
  bringToFront?: number;
  isOpened: boolean;
  onClose?: () => any;
  id?: TDialogId,
  children: any;
}

function Dialog({ children, bringToFront = Date.now(), onClose, id }: IPram) {
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null)

  const close = () => {
    if (onClose) {
      return onClose();
    }
    dispatch(closeAndRemoveAllDialog());
  }

  return (

    <Transition.Root show={open} as={Fragment}>
      <CDialog as="div" className={`relative z-${bringToFront}`} initialFocus={cancelButtonRef} onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-full text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <CDialog.Panel className="relative flex items-center content-center justify-center overflow-hidden transition-all transform sm:max-w-fit sm:w-full">

                {children}

              </CDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </CDialog>
    </Transition.Root>

  )
}
export default Dialog