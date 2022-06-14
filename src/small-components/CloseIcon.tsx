import { CloseOutlined } from '@ant-design/icons';
import { ElementEventType } from 'src/components/catalog/Catalog';

interface Props {
  className?: string;
  onClick?: (e: ElementEventType) => void;
  id?: string;
}
export const CloseIcon = ({ className, onClick, id }: Props) => (
  <CloseOutlined className={className} onClick={(e) => onClick!(e)} id={id} style={{fontSize: '19px'}}/>
);
