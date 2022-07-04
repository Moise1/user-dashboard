import aus_flag from '../../assets/channel/flags/AU.png';
import ger_flag from '../../assets/channel/flags/DE.png';
import sp_flag from '../../assets/channel/flags/ES.png';
import fr_flag from '../../assets/channel/flags/FR.png';
import it_flag from '../../assets/channel/flags/IT.png';
import uk_flag from '../../assets/channel/flags/UK.png';
import us_flag from '../../assets/channel/flags/US.png';
import { t } from '../../utils/transShim';
import { eCountry } from '../../types/eCountry';
import { Flag } from './Flag';


export interface StoreLocationProps {
  platform: number;
  step: number;
  handleChangeLocation: (newLocation:  number) => void;
  location: string | number | null;
}

const flags = [
  {
    id: 1,
    name: 'UK',
    path: uk_flag,
    platform: 'amazon',
    slug: 'uk',
    code: eCountry.UK,
  },
  {
    id: 2,
    name: 'USA',
    path: us_flag,
    platform: 'amazon',
    slug: 'us',
    code: eCountry.US,
  },
  {
    id: 3,
    name: 'Spain',
    path: sp_flag,
    platform: 'amazon',
    slug: 'es',
    code: 3,
  },
  {
    id: 4,
    name: 'France',
    path: fr_flag,
    platform: 'ebay',
    slug: 'fr',
    code: eCountry.FR,
  },
  {
    id: 5,
    name: 'Germany',
    path: ger_flag,
    platform: 'ebay',
    slug: 'de',
    code: eCountry.DE,
  },
  {
    id: 6,
    name: 'Australia',
    path: aus_flag,
    platform: 'ebay',
    slug: 'au',
    code: eCountry.AU,
  },
  {
    id: 7,
    name: 'Italy',
    path: it_flag,
    platform: 'ebay',
    slug: 'it',
    code: eCountry.IT,
  },
];

export const StoreLocation = (props: StoreLocationProps) => {
  const { platform, handleChangeLocation, location } = props;

  return (
    <form className="location-form">
      <h2 className="title">{t('store-base')}</h2>
      <p className="sub-title">
        {platform == 1 ? t('storebay') : platform == 3 ? t('storamz') : t('storshp')}
      </p>
      <div className="flags">
        {flags.map((i) => (
          <Flag
            index={i.id}
            key={i.name}
            flag={i.path}
            name={i.name}
            code={i.code}
            handleChangeLocation={handleChangeLocation}
          />
        ))}
      </div>
      {!location && <p className="danger-txt list-check">*Please select a country in order to proceed</p>}
    </form>
  );
};
