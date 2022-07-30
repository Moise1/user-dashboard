import { Countries, eCountry } from '../../../../../data/countries';
import { ePlatform, Platforms } from '../../../../../data/platforms';
import { TTag } from '../../../../../utils/transShim';

export const TryGetSolutionEbay = (site: eCountry, error: string, errorSourceInfo: string) => {
  const Contains = (message: string | undefined | null, term: string | undefined | null) => {
    if (!message || !term) return false;
    return message.indexOf(term) >= 0;
  };
  //Before you can list this item we need some additional information to create a seller's account.
  const Error120 = (site: eCountry) => {
    const link1 = 'https://fundinginstrument.ebay.' + Countries[site].TopLevelDomain + '/piapp/apmentry';
    const link2 = 'https://my.ebay.' + Countries[site].TopLevelDomain + '/ws/eBayISAPI.dll?MyEbay&CurrentPage=MyeBayPayPalAccounts&FClassic=true&ssPageName=STRK%3AME%3AMAPPX';
    return (
      <>
        <p key="_120_1">
          <TTag lKey='Error.Solution.eBay.Error120.1'/>
          <ul>
            <li key="1"><TTag lKey='Error.Solution.eBay.Error120.2' /></li>
            <li key="2"><TTag lKey='Error.Solution.eBay.Error120.3' /></li>
            <li key="3"><TTag lKey='Error.Solution.eBay.Error120.4' /></li>
          </ul>
        </p>
        <p key="_120_2">
          <TTag lKey='Error.Solution.eBay.Error120.5.1' />
          <a href={link1} rel="noreferrer" target='_blank'><TTag lKey='Error.Solution.eBay.Error120.5.2' /></a>
          <TTag lKey='Error.Solution.eBay.Error120.5.3' />
          <a href={link2} rel="noreferrer" target='_blank'><TTag lKey='Error.Solution.eBay.Error120.5.4' /></a>
        </p>
      </>
    );
  };
  //The email address you entered isn't linked to a PayPal account. If you don't have a PayPal account, you'll need to set one up with this address so that buyers can pay you. (You can set up your account after your item sells)
  const Warning21919158 = (errorCodes: string[]) => {
    if (errorCodes.indexOf('120') > 0) {
      //This warning will be ignored if error 120 code is also included
      return <></>;
    }
    return <p key="_21919158"><TTag lKey='Error.Solution.eBay.Warning21919158'/></p>;
  };
  const Error21916672 = () => <p key="_21916672"><TTag lKey='Error.Solution.eBay.Error21916672'/></p>;
  const Error21916586 = () => <p key="_21916586"><TTag lKey='Error.Solution.eBay.Error21916586'/></p>;
  const Error17103 = () => <p key="_17103"><TTag lKey='Error.Solution.eBay.Error17103'/></p>;
  const Error640 = () => <p key="_640"><TTag lKey='Error.Solution.eBay.Error640' /></p>;
  const Error717 = () => <p key="_717"><TTag lKey='Error.Solution.eBay.Error717'/></p>;
  const Error21919067 = () => <p key="_21919067"><TTag lKey='Error.Solution.eBay.Error21919067' /></p>;
  const Error21919188 = () => <p key="_21919188"><TTag lKey='Error.Solution.eBay.Error21919188' /></p>;
  const Error21920061 = () => <p key="_21920061"><TTag lKey="Error.Solution.eBay.Error21920061"/></p>;
  const Error121 = (site: eCountry) => {
    const domain = Platforms[ePlatform.eBay].domain[site];
    const ebayLink1 = 'https://fundinginstrument.ebay.' + domain + '/piapp/apmentry';
    const ebayLink2 = 'https://my.ebay.' + domain + '/ws/eBayISAPI.dll?MyEbay&CurrentPage=MyeBayPayPalAccounts&FClassic=true&ssPageName=STRK%3AME%3AMAPPX';
    return (
      <>
        <p key="_121_1">
          <TTag lKey="Error.Solution.eBay.Error21920061.1"/>
          <ol>
            <li key="1">
              <TTag lKey="Error.Solution.eBay.Error21920061.2"/>
            </li>
            <li key="2">
              <TTag lKey="Error.Solution.eBay.Error21920061.3" />
            </li>
          </ol>
        </p>
        <p key="121_2">
          <TTag lKey="Error.Solution.eBay.Error120.5.1" />
          <a href={ebayLink1} rel="noreferrer" target='_blank'>
            {ebayLink1}
          </a>
          <br />
          <TTag lKey="Error.Solution.eBay.Error21920061.4" />
          <a href={ebayLink2} rel="noreferrer" target='_blank'>
            {ebayLink2}
          </a>
        </p>
      </>
    );
  };
  const Error240 = (site: eCountry) => (
    <p key="_240">
      <TTag lKey='Error.Solution.eBay.Error240.1'/>
      <a href={'https://programme.ebay.' + Platforms[ePlatform.eBay].domain[site] + '/new_categories'} rel="noreferrer" target='_blank'><TTag lKey='Error.Solution.eBay.Error240.2' /></a>
      <TTag lKey='Error.Solution.eBay.Error240.3' />
    </p>
  );
  const Error21917158 = (site: eCountry) => {
    const domain = Platforms[ePlatform.eBay].domain[site];
    return (
      <>
        <p key="_21917158_1">
          <ol>
            <li key="_21917158_1_1">
              <TTag lKey="Error.Solution.eBay.Error21917158.1"/>
              <a rel="noreferrer" target='_blank' href={'https://my.ebay.' + domain + '/ws/eBayISAPI.dll?MyeBay&CurrentPage=MyeBaySellerAccounts&gbh=1&ssPageName=STRK:ME:LNLK'}>
                <TTag lKey="Error.Solution.eBay.Error21917158.2" />
              </a>
              <TTag lKey="Error.Solution.eBay.Error21917158.3" />
            </li>
            <li key="_21917158_1_2"><TTag lKey="Error.Solution.eBay.Error21917158.4"/></li>
            <li key="_21917158_1_3"><TTag lKey="Error.Solution.eBay.Error21917158.5" /></li>
            <li key="_21917158_1_4"><TTag lKey="Error.Solution.eBay.Error21917158.6" /></li>
          </ol>
        </p>
        <p key="_21917158_2"><TTag lKey="Error.Solution.eBay.Error21917158.7" /></p>
        <p key="_21917158_3"><TTag lKey="Error.Solution.eBay.Error21917158.8" /></p>
        <p key="_21917158_4"><TTag lKey="Error.Solution.eBay.Error21917158.9" /></p>
      </>
    );
  };
  const Error354 = (site: eCountry) => {
    const domain = Platforms[ePlatform.eBay].domain[site];
    const ebaylink = 'https://my.ebay.' + domain + '/ws/eBayISAPI.dll?MyeBay&CurrentPage=MyeBayPayPalAccounts&gbh=1&ssPageName=STRK:ME:LNLK';

    return (
      <p key="_354">
        <TTag lKey="Error.Solution.eBay.Error354.1"/>
        <ol>
          <li key="1">
            <TTag lKey="Error.Solution.eBay.Error354.2" />
            <a rel="noreferrer" target='_blank' href={ebaylink}>
              <TTag lKey="Error.Solution.eBay.Error354.3" />
            </a>
            <TTag lKey="Error.Solution.eBay.Error354.4" />
          </li>
          <li key="2">
            <TTag lKey="Error.Solution.eBay.Error354.5" />
            <a href="/ChannelConfiguration#business">
              <TTag lKey="Error.Solution.eBay.Error354.3" />
            </a>
          </li>
        </ol>
      </p>
    );
  };
  const Error21916328 = (error: string) => {
    if (error.indexOf('InternationalReturnsAcceptedOption') >= 0) {
      return <p key="_21916328"><TTag lKey="Error.Solution.eBay.Error21916328" /></p>;
    }
    return <></>;
  };
  const Error21919301 = (error: string) => {
    if (Contains(error, 'ISBN')) {
      return <p key="_21919301"><TTag lKey="Error.Solution.eBay.Error21919301"/></p>;
    }

    return <></>;
  };
  const Error21916503 = () => (
    <p>
      <TTag lKey='Error.Solution.eBay.Error21916503.1'/>
      <a href="/SourceConfiguration"><TTag lKey='Error.Solution.eBay.Error21916503.2' /></a>
      <TTag lKey='Error.Solution.eBay.Error21916503.3' />
    </p>
  );
  const Error10009 = (error: string) => {
    if (Contains(error, '<Item.Location>')) {
      return (
        <p key="_10009">
          <TTag lKey='Error.Solution.eBay.Error10009.1'/>
          <a href="/ChannelConfiguration#business"><TTag lKey='Error.Solution.eBay.Error10009.2' /></a>
          <TTag lKey='Error.Solution.eBay.Error21916503.3' />
        </p>
      );
    }
    return <></>;
  };
  const Error21915469 = () => (
    <p key="_21915469">
      <TTag lKey="Error.Solution.eBay.Error21915469.1" />
      <a href="/ChannelConfiguration#Business"><TTag lKey="Error.Solution.eBay.Error21915469.2" /></a>
      <TTag lKey="Error.Solution.eBay.Error21915469.3" />
    </p>
  );

  const solution: JSX.Element[] = [];
  if (errorSourceInfo) {
    const errorCodes = errorSourceInfo.split(',');
    for (const errorCode of errorCodes) {
      switch (
        parseInt(errorCode) //https://developer.ebay.com/devzone/xml/docs/Reference/ebay/Errors/errormessages.htm
      ) {
        case 120:
          solution.push(Error120(site));
          break;
        case 121:
          solution.push(Error121(site));
          break;
        case 240:
          solution.push(Error240(site));
          break;
        case 354:
          solution.push(Error354(site));
          break;
        case 640:
          solution.push(Error640());
          break;
        case 717:
          solution.push(Error717());
          break;
        case 10009:
          solution.push(Error10009(error));
          break;
        case 21916503:
          solution.push(Error21916503());
          break;
        case 21916672: //Variant name wrong
          solution.push(Error21916672());
          break;
        case 21916587:
        case 21916586:
          solution.push(Error21916586());
          break;
        case 21919301:
          solution.push(Error21919301(error));
          break;
        case 17103: //Wrong postal code
          solution.push(Error17103());
          break;
        case 21919158: //Not a valid paypal email
          solution.push(Warning21919158(errorCodes));
          break;
        case 21916328: //Invalid Return
          solution.push(Error21916328(error));
          break;
        case 2191503: //The XXX is missing
          break;
        case 21919067:
          solution.push(Error21919067());
          break;
        case 21917158:
          solution.push(Error21917158(site));
          break;
        case 21915469:
          solution.push(Error21915469());
          break;
        case 21919188: //Llimit of listings
          solution.push(Error21919188());
          break;
        case 21920061:
          solution.push(Error21920061());
          break;
      }
    }

    //TODO: Find this error codes in eBay
    if (Contains(error, 'Your item Location indicates that your items is in the')) {
      solution.push(
        <>
          <p key="_x">
            <ol>
              <li key="1">
                <TTag lKey="Error.Solution.eBay.old.7"/>
              </li>
              <li key="2">
                <TTag lKey="Error.Solution.eBay.old.8" />
              </li>
              <li key="3">
                <TTag lKey="Error.Solution.eBay.old.9" />
              </li>
            </ol>
          </p>
        </>
      );
    }
    if (Contains(error, 'Please enter a valid shipping policy')) {
      solution.push(<p key="_y"><TTag lKey='Error.Solution.eBay.old.1'/></p>);
    }
    if (Contains(error, 'Your location is missing')) {
      solution.push(<p key="_z"><TTag lKey="Error.Solution.eBay.old.10"/></p>);
    }
    if (Contains(error, 'The MPN is missing')) {
      solution.push(<p key="_xx"><TTag lKey='Error.Solution.eBay.old.2'/></p>);
    }
    if (Contains(error, 'Item specifics missing')) {
      solution.push(<p key="_xy"><TTag lKey="Error.Solution.eBay.old.11"/></p>);
    }
    if (
      Contains(error, "Unable to obtain product information: We couldn't find any price in the product page.")
    ) {
      solution.push(<p key="_xz"><TTag lKey="Error.Solution.eBay.old.12"/></p>);
    }
    if (
      Contains(
        error,
        'The item specific Type is missing. Add Type to this listing, enter a valid value and then try again.'
      )
    ) {
      solution.push(<p key="_yx"><TTag lKey="Error.Solution.eBay.old.13" /></p>);
    }
    if (Contains(error, 'his listing would cause you to exceed the amount you can list')) {
      const domain = Platforms[ePlatform.eBay].domain[site];

      const ebaylink = 'https://scgi.ebay.' + domain + '/ws/eBayISAPI.dll?UpgradeLimits&appId=0&refId=19';
      const ebayLink2 = 'https://sellerstandards.ebay.' + domain + '/dashboard';

      solution.push(
        <>
          <p key="_yz1">
            <TTag lKey="Error.Solution.eBay.old.14" />
          </p>
          <p key="_zx2">
            <TTag lKey="Error.Solution.eBay.old.15"/>
          </p>
          <p key="_zy3">
            <TTag lKey="Error.Solution.eBay.old.16" />
            <a href={ebaylink} target="_blank" rel="noreferrer">
              <TTag lKey="Error.Solution.eBay.Error354.3"/>
            </a>
            <TTag lKey="Error.Solution.eBay.Error354.4"/>
          </p>
          <p key="_zz4">
            <TTag lKey="Error.Solution.eBay.old.17" />
            <a href={ebayLink2} target="_blank" rel="noreferrer">
              <TTag lKey="Error.Solution.eBay.old.18" />
            </a>
            <TTag lKey="Error.Solution.eBay.old.19" />
          </p>
        </>
      );
    }
    if (Contains(error, 'Invalid token. You must relink your account.')) {
      solution.push(<p key="_ax"><TTag lKey="Error.Solution.eBay.old.20"/></p>);
    }
    if (Contains(error, 'Sorry, something went wrong. Please wait a moment and try again.')) {
      solution.push(<p key="_ay"><TTag lKey="Error.Solution.eBay.old.21"/></p>);
    }
    if (
      Contains(
        error,
        'Because this item is susceptible to price gouging, it may be sold only by authorized sellers. Do not relist this item'
      )
    ) {
      solution.push(<p key="_az"><TTag lKey='Error.Solution.eBay.old.3'/></p>);
    }

    //Our errors
    if (Contains(error, 'Ignored because it was out of stock')) {
      solution.push(<p key="_aa"><TTag lKey="Error.Solution.eBay.old.12"/></p>);
    }
    if (Contains(error, 'Object reference not set to an instance of an object.')) {
      solution.push(<p key="_bx"><TTag lKey="Error.Solution.eBay.old.22" /></p>);
    }
    if (Contains(error, 'Product is in VeRO list')) {
      solution.push(<p key="_by"><TTag lKey="Error.Solution.eBay.old.23" /></p>);
    }
    if (Contains(error, 'his item can only be sold domestically')) {
      solution.push(<p key="_bz"><TTag lKey='Error.Solution.eBay.old.3'/></p>);
    }

    if (solution.length > 0) return solution;

    return null;
  } else {
    const TryGetSolutionEbayOld = (site: eCountry, error: string) => {
      const solution: JSX.Element[] = [];
      if (Contains(error, 'you can list this item we need some additional information to create a')) {
        const link1 = 'https://fundinginstrument.ebay.' + Countries[site].TopLevelDomain + '/piapp/apmentry';
        const link2 = 'https://my.ebay.' + Countries[site].TopLevelDomain + '/ws/eBayISAPI.dll?MyEbay&CurrentPage=MyeBayPayPalAccounts&FClassic=true&ssPageName=STRK%3AME%3AMAPPX';
        solution.push(
          <>
            <p key="_120_1">
              <TTag lKey='Error.Solution.eBay.Error120.1' />
              <ul>
                <li key="1"><TTag lKey='Error.Solution.eBay.Error120.2' /></li>
                <li key="2"><TTag lKey='Error.Solution.eBay.Error120.3' /></li>
                <li key="3"><TTag lKey='Error.Solution.eBay.Error120.4' /></li>
              </ul>
            </p>
            <p key="_120_2">
              <TTag lKey='Error.Solution.eBay.Error120.5.1' />
              <a href={link1} rel="noreferrer" target='_blank'><TTag lKey='Error.Solution.eBay.Error120.5.2' /></a>
              <TTag lKey='Error.Solution.eBay.Error120.5.3' />
              <a href={link2} rel="noreferrer" target='_blank'><TTag lKey='Error.Solution.eBay.Error120.5.4' /></a>
            </p>
          </>
        );
      } else if (Contains(error, "the email address you entered isn't linked to a PayPal account.")) {
        solution.push(
          <>
            <p key="_120">
              <TTag lKey="Error.Solution.eBay.Warning21919158"/>
            </p>
          </>
        );
      }
      if (Contains(error, 'Your item Location indicates that your items is in the')) {
        solution.push(
          <>
            <p>
              <ol>
                <li key="1">
                  <TTag lKey="Error.Solution.eBay.old.7"/>
                </li>
                <li key="2">
                  <TTag lKey="Error.Solution.eBay.old.8" />
                </li>
                <li key="3">
                  <TTag lKey="Error.Solution.eBay.old.9" />
                </li>
              </ol>
            </p>
          </>
        );
      }
      if (Contains(error, 'Please enter a valid postal code')) {
        solution.push(<p><TTag lKey='Error.Solution.eBay.old.4'/></p>);
      }
      if (Contains(error, 'Please enter a valid return policy')) {
        solution.push(<p><TTag lKey='Error.Solution.eBay.old.5'/></p>);
      }
      if (Contains(error, 'Please enter a valid shipping policy')) {
        solution.push(<p><TTag lKey='Error.Solution.eBay.old.1'/></p>);
      }
      if (Contains(error, 'Your location is missing')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.10"/></p>);
      }
      if (Contains(error, 'The ISBN field is missing')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.Error21919301"/></p>);
      }
      if (Contains(error, 'The MPN is missing')) {
        solution.push(<p><TTag lKey='Error.Solution.eBay.old.2'/></p>);
      }
      if (Contains(error, 'Item specifics missing')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.11"/></p>);
      }
      if (Contains(error, "Unable to obtain product information: We couldn't find any price in the product page.")) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.12"/></p>);
      }
      if (
        Contains(
          error,
          'The item specific Type is missing. Add Type to this listing, enter a valid value and then try again.'
        )
      ) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.13"/></p>);
      }
      if (Contains(error, 'Ignored because it was out of stock')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.12" /></p>);
      }
      if (Contains(error, 'Object reference not set to an instance of an object.')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.22" /></p>);
      }
      if (Contains(error, 'Product is in VeRO list')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.23" /></p>);
      }
      if (Contains(error, 'Index was out of range. Must be non-negative and less than the size of the collection')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.24"/></p>);
      }
      if (Contains(error, 'his listing is for an item you already have on eBay')) {
        solution.push(<p><TTag lKey='Error.Solution.eBay.old.6'/></p>);
      }
      if (Contains(error, 'his listing would cause you to exceed your listing limit')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.Error21919188"/></p>);
      }
      if (Contains(error, 'his listing would cause you to exceed the amount you can list')) {
        const domain = Platforms[ePlatform.eBay].domain[site];

        const ebaylink = 'https://scgi.ebay.' + domain + '/ws/eBayISAPI.dll?UpgradeLimits&appId=0&refId=19';
        const ebayLink2 = 'https://sellerstandards.ebay.' + domain + '/dashboard';

        solution.push(
          <>
            <p key="1">
              <TTag lKey="Error.Solution.eBay.old.14"/>
            </p>
            <p key="2">
              <TTag lKey="Error.Solution.eBay.old.15" />
            </p>
            <p key="3">
              <TTag lKey="Error.Solution.eBay.old.16" />
              <a rel="noreferrer" target='_blank' href={ebaylink}>
                <TTag lKey="Error.Solution.eBay.Error354.3"/>
              </a>
              <TTag lKey="Error.Solution.eBay.Error354.4" />
            </p>
            <p key="4">
              <TTag lKey="Error.Solution.eBay.old.17" />
              <a rel="noreferrer" target='_blank' href={ebayLink2}>
                <TTag lKey="Error.Solution.eBay.old.18" />
              </a>
              <TTag lKey="Error.Solution.eBay.old.19" />
            </p>
          </>
        );
      }
      if (Contains(error, 'his item can only be sold domestically')) {
        solution.push(<p><TTag lKey='Error.Solution.eBay.old.3'/></p>);
      }
      if (Contains(error, 'Invalid token. You must relink your account.')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.20"/></p>);
      }
      if (Contains(error, 'Sorry, something went wrong. Please wait a moment and try again.')) {
        solution.push(<p><TTag lKey="Error.Solution.eBay.old.21" /></p>);
      }
      if (
        Contains(
          error,
          'Because this item is susceptible to price gouging, it may be sold only by authorized sellers. Do not relist this item'
        )
      ) {
        solution.push(<p><TTag lKey='Error.Solution.eBay.old.3' /></p>);
      }

      if (
        Contains(
          error,
          'ou will be unable to complete this request until payment is made or a credit card is put on record for automatic monthly billing'
        ) ||
        Contains(error, 'unable to complete this request until payment is made or a credit card is put on record')
      ) {
        const domain = Platforms[ePlatform.eBay].domain[site];

        const link1 = 'https://fundinginstrument.ebay.' + domain + '/piapp/apmentry';
        const link2 = 'https://my.ebay.' + domain + '/ws/eBayISAPI.dll?MyEbay&CurrentPage=MyeBayPayPalAccounts&FClassic=true&ssPageName=STRK%3AME%3AMAPPX';
        solution.push(
          <>
            <p key="_120_1">
              <TTag lKey='Error.Solution.eBay.Error120.1' />
              <ul>
                <li key="1"><TTag lKey='Error.Solution.eBay.Error120.2' /></li>
                <li key="2"><TTag lKey='Error.Solution.eBay.Error120.3' /></li>
                <li key="3"><TTag lKey='Error.Solution.eBay.Error120.4' /></li>
              </ul>
            </p>
            <p key="_120_2">
              <TTag lKey='Error.Solution.eBay.Error120.5.1' />
              <a href={link1} rel="noreferrer" target='_blank'><TTag lKey='Error.Solution.eBay.Error120.5.2' /></a>
              <TTag lKey='Error.Solution.eBay.Error120.5.3' />
              <a href={link2} rel="noreferrer" target='_blank'><TTag lKey='Error.Solution.eBay.Error120.5.4' /></a>
            </p>
          </>
        );
      }

      if (Contains(error, "you don't have a payment method set up with your eBay account")) {
        const domain = Platforms[ePlatform.eBay].domain[site];

        solution.push(
          <>
            <p key="_21917158_1">
              <ol>
                <li key="1">
                  <TTag lKey="Error.Solution.eBay.Error21917158.1" />
                  <a rel="noreferrer" target='_blank' href={'https://my.ebay.' + domain + '/ws/eBayISAPI.dll?MyeBay&CurrentPage=MyeBaySellerAccounts&gbh=1&ssPageName=STRK:ME:LNLK'}>
                    <TTag lKey="Error.Solution.eBay.Error21917158.2" />
                  </a>
                  <TTag lKey="Error.Solution.eBay.Error21917158.3" />
                </li>
                <li key="2"><TTag lKey="Error.Solution.eBay.Error21917158.4" /></li>
                <li key="3"><TTag lKey="Error.Solution.eBay.Error21917158.5" /></li>
                <li key="4"><TTag lKey="Error.Solution.eBay.Error21917158.6" /></li>
              </ol>
            </p>
            <p key="_21917158_2"><TTag lKey="Error.Solution.eBay.Error21917158.7" /></p>
            <p key="_21917158_3"><TTag lKey="Error.Solution.eBay.Error21917158.8" /></p>
            <p key="_21917158_4"><TTag lKey="Error.Solution.eBay.Error21917158.9" /></p>
          </>
        );
      }

      if (
        Contains(error, 'You must choose at least one payment method') ||
        Contains(error, 'lectionner au moins un mode de paiement.')
      ) {
        const domain = Platforms[ePlatform.eBay].domain[site];
        const ebaylink = 'https://my.ebay.' + domain + '/ws/eBayISAPI.dll?MyeBay&CurrentPage=MyeBayPayPalAccounts&gbh=1&ssPageName=STRK:ME:LNLK';

        solution.push(
          <p key="_354">
            <TTag lKey="Error.Solution.eBay.Error354.1" />
            <ol>
              <li key="1">
                <TTag lKey="Error.Solution.eBay.Error354.2" />
                <a rel="noreferrer" target='_blank' href={ebaylink}>
                  <TTag lKey="Error.Solution.eBay.Error354.3" />
                </a>
                <TTag lKey="Error.Solution.eBay.Error354.4" />
              </li>
              <li key="2">
                <TTag lKey="Error.Solution.eBay.Error354.5" />
                <a href="/ChannelConfiguration#business">
                  <TTag lKey="Error.Solution.eBay.Error354.3" />
                </a>
              </li>
            </ol>
          </p>
        );
      }

      if (solution.length > 0) return solution;

      return null;
    };

    return TryGetSolutionEbayOld(site, error);
  }
};
