import { useRouter } from "next/router";
import { useDispatch } from 'react-redux';
import { goBackDialog } from "../store/slices/dialogs";

interface IPrama {
  color?: "#D50000" | "#fff" | "#000";
  onClick?: () => void;
  isPageDialog?: boolean;
}

function BackButton({ color = "#fff", onClick, isPageDialog = true }: IPrama) {
  const router = useRouter();
  const dispatch = useDispatch();
  const goBack = () => {
    if (onClick) return onClick();
    if (isPageDialog) return dispatch(goBackDialog(null))
    router.back();
  };

  return (
    <div onClick={goBack} className="w-fit">
      <svg
        width="12"
        height="21"
        viewBox="0 0 12 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.3248 2L2.00005 9.79216L10.3248 19"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default BackButton;
