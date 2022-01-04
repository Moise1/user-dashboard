import { DispatchedOrderIcon } from '../common/Icons';
import { t } from '../../global/transShim';
import { Button } from 'antd';
import '../../sass/light-theme/config-btns.scss';

export const ConfigButtons = () => {
  return (
    <div className="config-btns">
      <Button className="save-btn">
        <DispatchedOrderIcon />
        <span className="ml-2">{t('SourceConfigInputs.SaveChanges')} </span>
      </Button>
      <Button className="reset-btn"> {t('SourceConfigInputs.ResetToDefault')}</Button>
    </div>
  );
};
