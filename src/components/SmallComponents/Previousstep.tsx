import back_icon from '../../assets/channel/flags/back.png';
import { t } from '../../global/transShim';

interface props {
  Previous: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function Previousstep(props: props) {
  return (
    <button onClick={props.Previous} type="submit" className="bg-trans border-0 text-left lh-1">
      <img src={back_icon} height="30" alt="previous_icon" />
      <div className="d-purple font-weight-bold small d-md-block d-none">
        {t('pre')} {t('stp')}
      </div>
    </button>
  );
}

export default Previousstep;
