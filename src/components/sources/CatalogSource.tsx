import { useState } from 'react';
import { Divider } from 'antd';
import { PlusCircle, MinusCircle } from 'react-feather';
import amazon from '../../assets/catalog-sources/amazon.png';
import banggood from '../../assets/catalog-sources/bangood.png';
import costco from '../../assets/catalog-sources/costco.png';
import cox from '../../assets/catalog-sources/cox.png';
import garden_street from '../../assets/catalog-sources/garden-street.png';
import robert_dyas from '../../assets/catalog-sources/robert-dyas.png';
import zoo_plus from '../../assets/catalog-sources/zooplus.png';
import garden_line from '../../assets/catalog-sources/garden-line.png';
import { SearchInput } from '../small-components/TableActionBtns';
import { SuccessBtn, CancelBtn } from '../small-components/ActionBtns';
import { t } from '../../global/transShim';
import '../../sass/catalog-source.scss';

interface Props {
  handleClose: () => void;
}
export const CatalogSource = ({ handleClose }: Props) => {
  const onSearch = (value: string) => console.log('searched value', value);
  const [addedSources, setAddedSources] = useState<{ id: number; img: string }[]>([]);
  const [pendingSources, setPendingSources] = useState<{ id: number; img: string }[]>([
    {
      id: 1,
      img: amazon
    },
    {
      id: 2,
      img: banggood
    },
    {
      id: 3,
      img: cox
    },
    {
      id: 4,
      img: garden_street
    },
    {
      id: 5,
      img: garden_line
    },
    {
      id: 6,
      img: robert_dyas
    },
    {
      id: 7,
      img: costco
    },
    {
      id: 8,
      img: zoo_plus
    }
  ]);

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
              <img src={s.img} alt="" className="source-img" />
              <MinusCircle className="remove-source-icon" size="18" onClick={() => removeSource(s.id)} />
            </div>
          ))
        )}
      </div>

      <div className="source-lists-area">
        <SearchInput onSearch={onSearch} />
        <div className="pending-sources-list">
          {pendingSources.map((s) => (
            <div key={s.id} className="source">
              <img src={s.img} alt="" className="source-img" />
              <PlusCircle className="pending-source-icon" size="18" onClick={() => addSource(s.id)} />
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div className="action-btns">
        <CancelBtn handleClose={handleClose}>{t('Cancel')}</CancelBtn>
        <SuccessBtn>{t('AddSources')}</SuccessBtn>
      </div>
    </div>
  );
};
