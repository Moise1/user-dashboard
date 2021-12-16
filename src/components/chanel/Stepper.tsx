import { Steps } from 'antd';

interface Props {
  current: number;
  className: string;
}

export const Stepper = ({ current, className }: Props) => {
  const { Step } = Steps;
  return (
    <Steps current={current} className={className}>
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
      <Step />
    </Steps>
  );
};
