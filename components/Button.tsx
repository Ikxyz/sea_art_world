/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HTMLAttributes, MouseEventHandler, useEffect, useMemo } from 'react';
import RenderIf from "./RenderIf";
import Spinner from "./Spinner";

interface IParam {
  text: string;
  type?: "button" | "submit";
  icon?: string;
  link?: string;
  bgColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  outlined?: boolean;
  center?: boolean;
  textClass?: HTMLAttributes<HTMLElement>['className'];
  buttonClass?: HTMLAttributes<HTMLElement>['className'];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function CButton({
  text,
  onClick,
  type = "submit",
  icon, disabled = false,
  center = true,
  outlined = false,
  fullWidth = false,
  link = "", textClass, isLoading = false,
  bgColor = "bg-secodary", buttonClass
}: IParam) {

  if (outlined) {
    bgColor = "bg-transparent";
  }
  bgColor = disabled ? "bg-grey-200" : bgColor;


  const otherClass = useMemo(() => disabled || isLoading ? 'cursor-not-allowed' : 'cursor-pointer', [disabled, isLoading]);

  const LinkButton = () => <Link href={isLoading || disabled ? "#" : link} >
    <a className={`${icon ? 'justify-between' : 'justify-center'} ${bgColor}  flex items-center content-between   w-full h-16 px-6 py-0 mx-auto my-5 text-white border-none  rounded-xl ${otherClass} ${buttonClass}`}>
      <RenderIf isTrue={isLoading == false} elseShow={<Spinner />}>
        <span className={textClass ?? ''}> {text}</span>
      </RenderIf>
      <RenderIf isTrue={!!icon}>
        <img src={icon} alt="icon" width="10" height="21" />
      </RenderIf>
    </a>
  </Link>

  const NormalButton = () => <button
    onClick={isLoading || disabled ? () => { } : onClick}
    type={type}
    className={`${icon ? 'justify-between' : 'justify-center'} ${bgColor} ${outlined ? 'border-secodary border-solid border-[1px]' : 'border-none'} flex text-center items-center content-between  ${fullWidth ? 'w-full' : 'min-w-fit'}  h-11 px-8 py-0   text-white  relative  ${center ? 'mx-auto' : ''} ${otherClass} ${buttonClass}`}
  >
    <div className={`bg-secodary  absolute h-8 w-5  ${outlined ? 'w-2 -left-[7px] border-transparent border-0 ' : 'w-5 -left-4 border-primary border-x-[8px]'} border-solid   border-y-[6px] box-border`}></div>
    <RenderIf isTrue={isLoading == false} elseShow={<Spinner />}>
      <span className={textClass ?? ''}> {text}</span>
    </RenderIf>
    {
      <RenderIf isTrue={!!icon} elseShow={<></>}>
        <img src={icon} alt="icon" width="10" height="21" />
      </RenderIf>
    }
    <div className={`bg-secodary  absolute h-8 w-5  ${outlined ? 'w-2 -right-[7px] border-transparent border-0 ' : 'w-5 -right-4 border-primary border-x-[8px]'} border-solid   border-y-[6px] box-border`}></div>
  </button>


  return <RenderIf isTrue={link!.trim().length === 0} elseShow={<LinkButton />}>
    <NormalButton />
  </RenderIf>
}
