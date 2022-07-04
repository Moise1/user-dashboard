import { Steps } from 'antd';

interface Props {
  current: number;
  platform: number | null;
  className: string;
}

export const Stepper = ({ current, platform, className }: Props) => {
  const { Step } = Steps;
  return (
    <div className="mobile-stepper">
      <Steps current={platform ? current: 0} className={className} direction='horizontal'>
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
        <Step />
      </Steps>
    </div>
  );
};
