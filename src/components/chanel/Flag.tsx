import { ElementEventType } from '../catalog/Catalog';

export interface FlagProps {
  name: string;
  flag: string;
  code: number;
  index: number;
  handleChangeLocation: (locationCode: number) => void;
}
export const Flag = (props: FlagProps) => {
  const {handleChangeLocation, flag, name, code, index } = props;
  const onSelectLocation = (e: ElementEventType) => {
    const target = e.currentTarget;
    const selectedLocation = target.getAttribute('id');
    handleChangeLocation(parseInt(selectedLocation!));
  };
  
  return (
    <div className="flag-container">
      <img 
        tabIndex={index}
        src={flag}
        height="80" 
        width="80" 
        className="flag-img" 
        alt="flag" id={String(code)} onClick={onSelectLocation} />
      <>{name}</>
    </div>
  );
};
