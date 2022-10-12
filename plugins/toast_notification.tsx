import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface IOptions {
  duration?: number;
  promise?: { errorMsg: string, successMsg: string, loadingMsg: string, task: Promise<any> }
}

export const showNotification = (msg = "", type?: "success" | "error", option?: IOptions) => {


  // if (option) {
  //   return handlePromiseToast(option);
  // }

  // if (type === "success") {
  //   return toast.success(msg)
  // }

  // if (type === "error") {
  //   return toast.error(msg);
  // }

  return toast(msg);


}

const handlePromiseToast = ({ promise }: IOptions) => {
  if (!promise || !promise.task) return;
  toast.promise(promise.task, {
    loading: promise?.loadingMsg,
    success: promise?.successMsg,
    error: promise?.errorMsg
  })
}

export default function ToastNotification() {
  return (
    <Toaster position='bottom-right' reverseOrder={false} />
  )
}
