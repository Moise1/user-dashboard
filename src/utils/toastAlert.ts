import { toast } from 'react-toastify';
import { TypeOptions, ToastContent, ToastPosition } from 'react-toastify/dist/types/index';

type DelayType = number | false | undefined;
type PositionType = ToastPosition | undefined;

export const toastAlert = (
  message: ToastContent,
  type: TypeOptions = 'default',
  delay: DelayType = 3000,
  position: PositionType = 'top-right'
) => {
  const options = {
    position,
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };
  type === 'default' ? toast(message, options) : toast[type](message, options);
};
