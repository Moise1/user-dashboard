import { DispatchedOrderIcon } from '../common/Icons';
import { t } from '../../global/transShim';
import {Button} from 'antd';

interface Props {
  className: string;
}
const ConfigButtons = ({ className }: Props) => {
  return (
    <div className={className}>
      <Button className="save-btn">
        <DispatchedOrderIcon />
        <span className="ml-2">{t('SourceConfigInputs.SaveChanges')} </span>
      </Button>
      <Button className="reset-btn"> {t('SourceConfigInputs.ResetToDefault')}</Button>
    </div>
  );
};

export default ConfigButtons;
