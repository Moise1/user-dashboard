import { Steps } from 'antd';

interface Props {
  current: number;
  platform: number | null;
  className: string;
}

export const Stepper = ({ current, platform, className }: Props) => {
  const { Step } = Steps;
  return (
    <Steps current={platform ? current: 0} className={className}>
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
    </Steps>
  );
};
