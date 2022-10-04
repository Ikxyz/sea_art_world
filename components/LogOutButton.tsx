/* eslint-disable @next/next/no-img-element */
import { MouseEventHandler } from "react";
import RenderIf from "./RenderIf";


interface IParam {
  text: string;
  type?: "button" | "submit";
  icon?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function LogOutButton({
  text,
  onClick,
  type = "submit",
  icon,
}: IParam) {
  return (
    <button
      className="w-[142px] h-[40px] text-sm font-normal bg-red text-white rounded-xl flex content-between justify-between items-center py-0 px-5  cursor-pointer border-none m-0 relative bottom-0"
      onClick={onClick}
      type={type}
    >
      {text}
      {
        <RenderIf isTrue={!!icon}>
          <img src={icon} width="14" height="14" alt="icon" />
        </RenderIf>
      }
    </button>
  );
}
