import Color from "../constants/color";
import Devices from "../constants/layout";



interface IParam {
  children: any;
  className?: string;
}

function Card({ children, className = "" }: IParam) {
  return (
    <div
      className={
        "box-border w-full px-8 py-6 overflow-x-auto bg-gray-100 rounded-2xl md:py-3 md:px-5 md:rounded-3xl " +
        className
      }
    >
      {children}
    </div>
  );
}

export default Card;
