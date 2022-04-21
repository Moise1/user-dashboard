import { SuccessBtn,WarningBtn, CancelBtn } from '../components/small-components/ActionBtns';

export const determineStatus = (statusValue: string | number) =>{
  switch (statusValue) {
  case 0: 
    return <CancelBtn disabled={true}>Disabled</CancelBtn>;
  case 1000:
    return <WarningBtn>In Progress</WarningBtn>;
  case 2000:
    return <SuccessBtn>Dispatched</SuccessBtn>;
  default:
    break;
  }
};