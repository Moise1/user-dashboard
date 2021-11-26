import '../../sass/light-theme/listings-status.scss';

interface Props {
  title: string;
  active: number;
  index: number;
  onChangeTab: () => void;
}

const  ListingsStatusBtn = (props: Props)=> {
  const { title, active, onChangeTab, index } = props;
  return (
    <button onClick={onChangeTab} className={`${active == index ? 'active-btn' : 'inactive-btn'} status-btn`}>
      {title}
    </button>
  );
};

export default ListingsStatusBtn;