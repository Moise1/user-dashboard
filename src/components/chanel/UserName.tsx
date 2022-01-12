import { t } from '../../global/transShim';

interface values {
  user: string;
}
interface props {
  step: number;
  user: string;
  values: values;
  platform: platformType;
  handleChangeUser: (newUser: string) => void;
}

export const UserName = (props: props) => {
  const { handleChangeUser,values, platform, user } = props;

  return (
    <form>
      <div className="row mx-auto px-lg-5 px-md-3 h-80vh">
        <div className="text-center mx-auto col-md-6 mt-2 px-0 px-md-2">
          <h5 className="font-weight-bold mb-0">
            {t('whatsur')}
            {platform == 'ebay' ? ' EBay ' : platform == 'amazon' ? ' Amazon ' : ' Shopify '}
            {t('username')}?
          </h5>
        </div>
        <div className="text-center col-12 col-md-8 mx-auto">
          <div>
            {t('makesure')}
            {platform == 'ebay' ? ' EBay ' : platform == 'amazon' ? ' Amazon ' : ' Shopify '}{' '}
            <span className="font-weight-bold">{t('username')} </span> {t('notur')}
          </div>
          <div>
            <input
              type="email"
              className="form-control mt-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={user}
              placeholder={
                platform == 'ebay'
                  ? ' EBay username'
                  : platform == 'amazon'
                    ? ' Amazon username'
                    : ' Shopify username'
              }
              onChange={(e) => handleChangeUser(e.target.value)}
            />
            <div
              className={`text-left font-weight-bold
            ${values.user == '' ? 'text-danger' : 'd-none'}
            `}
            >
              <i>
                {t('fill')}
                {platform == 'ebay' ? ' EBay ' : platform == 'amazon' ? ' Amazon ' : ' Shopify '}{' '}
                {t('username')}
              </i>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};