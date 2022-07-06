import { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { SearchInput } from '../../small-components/TableActionBtns';
import { SuccessBtn, CancelBtn } from '../../small-components/ActionBtns';
import { t } from '../../utils/transShim';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import '../../sass/catalog-source.scss';
import { getSources } from 'src/redux/sources/sourcesThunk';
import { useAppDispatch } from 'src/custom-hooks/reduxCustomHooks';
import { Source } from '../../redux/sources/sourceSlice';

interface Props {
  handleClose: () => void;
  getSourcesData: (ids: number[]) => void;
  sources: Source[];
}
export const CatalogSource = ({ handleClose, getSourcesData, sources }: Props) => {
  const dispatch = useAppDispatch();
  const onSearch = (value: string) => console.log('searched value', value);
  const [addedSources, setAddedSources] = useState<Source[]>([]);
  const [pendingSources, setPendingSources] = useState<Source[]>(sources);

  const addSource = (id: number): void => {
    const addedSource = pendingSources.filter((s) => s.id === id)[0];
    setAddedSources((prevState) => [...prevState, addedSource]);
    setPendingSources((prevState) => prevState.filter((s) => s.id !== id));
  };

  const removeSource = (id: number): void => {
    const removedSource = addedSources.filter((s) => s.id === id)[0];
    setPendingSources((prevState) => [...prevState, removedSource]);
    setAddedSources((prevState) => prevState.filter((s) => s.id !== id));
  };

  const cancelFiltering = () => {
    setAddedSources([]);
    setPendingSources(
      sources
    );
  };

  useEffect(() => {
    getSourcesData(addedSources.map(item => item.id));
    dispatch(getSources());
  }, [addedSources]);
  return (
    <div className="catalog-source">
      <p className="tag-line">
        <strong>Show products from the following sources</strong>
      </p>
      <div className="added-sources-list">
        {!addedSources.length ? (
          <p>No added source</p>
        ) : (
          addedSources.map((s) => (
            <div key={s.id} className="source">
              <img
                className='source-img'
                src={require('../../assets/logos/' + s.id + '.png').default}
              />
              <MinusCircleOutlined className="remove-source-icon" onClick={() => removeSource(s.id)} />
            </div>
          ))
        )}
      </div>

      <div className="source-lists-area">
        <SearchInput onSearch={onSearch} />
        <div className="pending-sources-list">
          {pendingSources.map((s) => (
            <div key={s.id} className="source">
              <img
                className='source-img'
                src={require('../../assets/logos/' + s.id + '.png').default}
              />
              <PlusCircleOutlined className="pending-source-icon" onClick={() => addSource(s.id)} />
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div className="action-btns">
        <SuccessBtn>{t('AddSources')}</SuccessBtn>
        <CancelBtn handleClose={handleClose} cancelFiltering={cancelFiltering}>{t('Button.Cancel')}</CancelBtn>
      </div>
    </div>
  );
};
