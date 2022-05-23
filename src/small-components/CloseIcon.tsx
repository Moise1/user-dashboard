import { X } from 'react-feather';
import { ProductElementEvent } from 'src/components/catalog/Catalog';

interface Props {
  className?: string;
  onClick?: (e: ProductElementEvent) => void;
  size?: string;
  id?: string;
}
export const CloseIcon = ({ className, onClick, size, id }: Props) => (
  <X className={className} onClick={(e) => onClick!(e)} size={size} id={id}/>
);
