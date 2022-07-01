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


interface values {
  storeLocation: string;
}
export interface StoreLocationProps {
  platform: number;
  step: number;
  handleChangeLocation: (newLocation:  number) => void;
  values?: values;
}

const flags = [
  {
    name: 'UK',
    path: uk_flag,
    platform: 'amazon',
    slug: 'uk',
    code: eCountry.UK,
  },
  {
    name: 'USA',
    path: us_flag,
    platform: 'amazon',
    slug: 'us',
    code: eCountry.US,
  },
  {
    name: 'Spain',
    path: sp_flag,
    platform: 'amazon',
    slug: 'es',
    code: 3,
  },
  {
    name: 'France',
    path: fr_flag,
    platform: 'ebay',
    slug: 'fr',
    code: eCountry.FR,
  },
  {
    name: 'Germany',
    path: ger_flag,
    platform: 'ebay',
    slug: 'de',
    code: eCountry.DE,
  },
  {
    name: 'Australia',
    path: aus_flag,
    platform: 'ebay',
    slug: 'au',
    code: eCountry.AU,
  },
  {
    name: 'Italy',
    path: it_flag,
    platform: 'ebay',
    slug: 'it',
    code: eCountry.IT,
  },

];

export const StoreLocation = (props: StoreLocationProps) => {
  const { platform, handleChangeLocation, values } = props;

  return (
    <form className="location-form">
      <h5 className="title">{t('bar2')}?</h5>
      <h6 className="sub-title">
        {platform == 1 ? t('storebay') : platform == 3 ? t('storamz') : t('storshp')}
      </h6>
      <div className="flags">
        {flags.map((i) => (
          <Flag
            key={i.name}
            // platform={platform}
            // currentPlatform={i.platform}
            flag={i.path}
            name={i.name}
            code={i.code}
            // key={i.slug}
            // location={values.storeLocation}
            handleChangeLocation={handleChangeLocation}
          />
        ))}
      </div>
      <p className="select-country">
        {' '}
        {values?.storeLocation == '' ? '*Please select a country in order to proceed' : null}
      </p>
    </form>
  );
};
