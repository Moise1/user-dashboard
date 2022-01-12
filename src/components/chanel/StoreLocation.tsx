import aus_flag from '../../assets/channel/flags/AU.png';
import ger_flag from '../../assets/channel/flags/DE.png';
import sp_flag from '../../assets/channel/flags/ES.png';
import fr_flag from '../../assets/channel/flags/FR.png';
import it_flag from '../../assets/channel/flags/IT.png';
import uk_flag from '../../assets/channel/flags/UK.png';
import us_flag from '../../assets/channel/flags/US.png';
import { t } from '../../global/transShim';
import Flag, { FlagProps } from './Flag';

interface values {
  storeLocation: string;
}
export interface StoreLocationProps {
  platform: platformType;
  step: number;
  handleChangeLocation: (newLocation: string) => void;
  values: values;
}

const flags: FlagProps[] = [
  {
    name: 'Australia',
    path: aus_flag,
    platform: 'ebay',
    slug: 'australia'
  },
  {
    name: 'Germany',
    path: ger_flag,
    platform: 'ebay',
    slug: 'germany'
  },
  {
    name: 'Spain',
    path: sp_flag,
    platform: 'amazon',
    slug: 'spain'
  },
  {
    name: 'France',
    path: fr_flag,
    platform: 'ebay',
    slug: 'france'
  },
  {
    name: 'Italy',
    path: it_flag,
    platform: 'ebay',
    slug: 'italy'
  },
  {
    name: 'United Kingdom',
    path: uk_flag,
    platform: 'amazon',
    slug: 'uk'
  },
  {
    name: 'United States of America',
    path: us_flag,
    platform: 'amazon',
    slug: 'us'
  }
];

export const StoreLocation = (props: StoreLocationProps) => {
  const { platform, handleChangeLocation, values } = props;

  return (
    <form className="location-form">
      <h5 className="title">{t('bar2')}?</h5>
      <h6 className="sub-title">{platform == 'ebay' ? t('storebay') : platform == 'amazon' ? t('storamz') : t('storshp')}</h6>
      <div className="flags">
        {flags.map((i) => (
          <Flag
            platform={platform}
            currentPlatform={i.platform}
            flag={i.path}
            name={i.name}
            key={i.name}
            location={values.storeLocation}
            handleChangeLocation={handleChangeLocation}
          />
        ))}
      </div>
      <p className="select-country">
        {' '}
        {values.storeLocation == '' ? '*Please select a country in order to proceed' : null}
      </p>
    </form>
  );
};
