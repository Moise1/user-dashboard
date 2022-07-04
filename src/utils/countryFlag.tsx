import Flags from 'country-flag-icons/react/1x1';

type isoCountryType = number | undefined | string | boolean | Date;

export const countryFlag = (isoCountry: isoCountryType) => {
  switch (isoCountry) {
    case 1:
      return <Flags.GB title="United Kingdom" className="flag" />;
    case 2:
      return <Flags.US title="United States" className="flag" />;
    case 3:
      return <Flags.ES title="Spain" className="flag" />;
    case 4:
      return <Flags.FR title="France" className="flag" />;
    case 5:
      return <Flags.DE title="Germany" className="flag" />;
    case 6:
      return <Flags.AU title="Australia" className="flag" />;
    case 7:
      return <Flags.IT title="Italy" className="flag" />;
    default:
      break;
  }
};
