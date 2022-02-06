import { t } from '../../global/transShim';
import { Input } from 'antd';

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
  const { handleChangeUser, values, platform, user } = props;

  return (
    <form className="username-form">
      <h5 className="title">
        {' '}
        {t('whatsur')} {platform} &apos;s {t('username')}?{' '}
      </h5>
      <p>
        {t('makesure')}
        {platform}
        <span className="username">{t('username')} </span> {t('notur')}
      </p>
      <div>
        <Input
          type="email"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={user}
          placeholder={
            platform == 'ebay' ? ' EBay username' : platform == 'amazon' ? ' Amazon username' : ' Shopify username'
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
            {platform == 'ebay' ? ' EBay ' : platform == 'amazon' ? ' Amazon ' : ' Shopify '} {t('username')}
          </i>
        </div>
      </div>
    </form>
  );
};
