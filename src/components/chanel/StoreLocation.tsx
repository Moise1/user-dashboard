import React from 'react';
import aus_flag from '../../assets/channel/flags/AU.png';
import ger_flag from '../../assets/channel/flags/DE.png';
import sp_flag from '../../assets/channel/flags/ES.png';
import fr_flag from '../../assets/channel/flags/FR.png';
import it_flag from '../../assets/channel/flags/IT.png';
import uk_flag from '../../assets/channel/flags/UK.png';
import us_flag from '../../assets/channel/flags/US.png';
import { ProgressBar } from './ProgressBar';
import { NextBtn } from './NextBtn';
import { t } from '../../global/transShim';
import Previousstep from '../small-components/Previousstep';
import Flag, { FlagProps } from './Flag';
import '../../sass/light-theme/store-location.scss';

interface values {
  storeLocation: string;
}
export interface StoreLocationProps {
  nextStep: () => void;
  prevStep: () => void;
  platform: platformType;
  step: number;
  handleChangeLocation: (newLocation: string) => void;
  values: values;
  /*
   { nextStep, handleChangeLocation, values, platform, step, flag, prevStep }
   */
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

function StoreLocation(props: StoreLocationProps) {
  const { nextStep, prevStep, platform, step, handleChangeLocation, values } = props;
  const Continue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nextStep();
  };
  const Previous = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form className="location-form">
      <div className="col-xl-8   bg-white  mt-2 pt-1">
        <Previousstep Previous={Previous} />
        <div className="row mx-auto px-lg-5 px-md-3 h-resp-65">
          <div className="text-center col-10 mt-2 mx-auto">
            <h5 className="font-weight-bold">{t('bar2')}?</h5>
          </div>
          <div className="text-center col-12 col-md-10 mx-auto">
            <h6 className="">
              {platform == 'ebay' ? t('storebay') : platform == 'amazon' ? t('storamz') : t('storshp')}
            </h6>
          </div>
          {flags.map((i) => (
            <React.Fragment key={i.name}>
              <Flag
                platform={platform}
                currentPlatform={i.platform}
                flag={i.path}
                name={i.name}
                location={values.storeLocation}
                handleChangeLocation={handleChangeLocation}
              />
            </React.Fragment>
          ))}

          <div className="col-12"></div>
          <div className="mx-md-auto ml-auto mt-md-4 text-right text-md-center w-100 next-fix">
            <div className="text-danger w-100 text-center small d-block d-md-none">
              {values.storeLocation == '' ? '  *Please select a country in order to proceed' : ''}
            </div>
            <NextBtn onClick={Continue} title={t('nxt')} disabled={values.storeLocation == ''} />

            <div className="text-danger w-100 text-center mb-2 small d-md-block d-none">
              {values.storeLocation == '' ? t('strchck') : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 d-xl-block d-none m-auto">
        <ProgressBar platform={platform} step={step} />
      </div>
    </form>
  );
}

export default StoreLocation;
