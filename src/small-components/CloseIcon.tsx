import {X} from 'react-feather';

interface Props {
    className?: string;
    onClick?: () => void;
    size?: string;
}
export const CloseIcon = ({className, onClick, size}: Props) => (
  <X className={className} onClick={onClick} size={size}/>
);