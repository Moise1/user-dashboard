import { t } from '../../utils/transShim';
import { Input } from 'antd';

interface values {
  user: string;
}
interface props {
  step: number;
  user: string;
  values: values;
  platform: number;
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
            platform === 1 ? ' EBay username' : platform === 3 ? ' Amazon username' : ' Shopify username'
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
            {platform === 1 ? ' EBay ' : platform === 3 ? ' Amazon ' : ' Shopify '} {t('username')}
          </i>
        </div>
      </div>
    </form>
  );
};
