import {X} from 'react-feather';

interface Props {
    className?: string;
    onClick?: () => void;
}
export const CloseIcon = ({className, onClick}: Props) => <X className={className} onClick={onClick}/>;