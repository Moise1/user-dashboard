// import { SuccessBtn,WarningBtn, CancelBtn } from '../components/small-components/ActionBtns';
import { SuccessBtn, WarningBtn, ProgressBtn } from '../small-components/ActionBtns';

export const determineStatus = (statusValue: string | number) => {
  switch (statusValue) {
    case 0:
      return <WarningBtn>A.O Disabled</WarningBtn>;
    case 1:
      return <ProgressBtn>In Progress</ProgressBtn>;
    case 1000:
      return <SuccessBtn>Checkout </SuccessBtn>;
    case 2000:
      return <SuccessBtn>Dispatched</SuccessBtn>;
    case 2100:
      return <SuccessBtn>Manually Dispatched</SuccessBtn>;
    default:
      break;
  }
};
