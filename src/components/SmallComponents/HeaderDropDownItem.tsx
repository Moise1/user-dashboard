import React from 'react';

import flag from '../../assets/flag-round-500.svg';
import amazon from '../../assets/amazon-icon-1.svg';
import { setTranslations, setDefaultLanguage, useTranslation } from 'react-multi-lang';
import en from '../../translation.json';
setTranslations({ en });
setDefaultLanguage('en');
export default function HeaderDropDownItem() {
  const t = useTranslation();
  return (
    <div className="col-md-12 my-2 mx-auto mb-2">
      <div className="d-flex aligh-items-center">
        <div className=" lh-1 fw-bold ff-used  fs-14 c-000">{t('lnkst')} </div>
        <img src={flag} className="lh-1 mx-2" height="20" alt="" />
        <img src={amazon} className="pt-1 lh-1" height="20" alt="" />
      </div>
    </div>
  );
}
