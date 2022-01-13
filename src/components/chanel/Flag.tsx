export interface FlagProps {
  name: string;
  platform: platformType;
  path?: string;
  slug?: string;
  flag?: string;
  location?: string;
  handleChangeLocation?: (newLocationName: string) => void;
  currentPlatform?: platformType;
}

export const Flag  = (props: FlagProps) =>{
  const { platform, currentPlatform, handleChangeLocation, flag, name, location } = props;
  return (
    <div
      className={`col-4 mb-2 ${
        (platform == 'amazon' || platform == 'shopify') && currentPlatform == 'ebay' ? 'd-none' : ''
      }`}
    >
      <label className="">
        <input
          type="radio"
          name="product"
          className="card-input-flag d-none"
          value={'storelocation'}
          onChange={() => handleChangeLocation?.(name)}
        />
        <div className="panel panel-default mx-auto w-fit m-0 p-0 card-input rounded-circle">
          <img
            src={flag}
            height="80"
            width="80"
            className={`  ${location == name || location == '' ? '' : 'disabled-btn'}`}
            alt="flag"
          />
        </div>
        <div className="panel-body text-center">{name}</div>
      </label>
    </div>
  );
};
