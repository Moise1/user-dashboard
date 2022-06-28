import { t } from '../../utils/transShim';
import {Steps} from 'antd';
import { eShop } from 'src/utils/eShop';
import '../../sass/progress-bar.scss';

interface props {
  step: number;
  platform: number | null;
}

export const SideProgressBar = (props: props) => {
  const {step: currentStep, platform} = props;
  const {Step} = Steps;
  return (
    <Steps direction="vertical" current={platform ? currentStep : 0}>
      <Step title={t('selling-point')} description=""/>
      <Step title={t('store-base')}/>
      <Step title={`${eShop[platform!] ?? ''}  ${t('selected-account')}`}/>
      <Step title={t('account-connection')}/>
      <Step title={`${t('link')} ${eShop[platform!] ?? ''} ${t('account')}`}/>
      <Step title={t('product-options')}/>
    </Steps>
  );
};
