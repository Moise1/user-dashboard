// import { SuccessBtn,WarningBtn, CancelBtn } from '../components/small-components/ActionBtns';
import { SuccessBtn,WarningBtn } from '../components/small-components/ActionBtns';


export const determineStatus = (statusValue: string | number) =>{
  switch (statusValue) {
  case 0: 
    return <WarningBtn disabled={true}>AO DISABLED</WarningBtn>;
  case 1: 
    return <WarningBtn >In Progress</WarningBtn>;
  case 1000:
    return <WarningBtn>Checkout </WarningBtn>;
  case 2000:
    return <SuccessBtn>Dispatched</SuccessBtn>;
  case 2100:
    return <SuccessBtn>Manually Dispatched</SuccessBtn>;
  default:
    break;
  }
};