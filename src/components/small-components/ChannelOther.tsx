import { Input } from 'antd';

export const ChannelOther = () => {
  return (
    <>
      <div className="row settings-list">
        <div className="col-12 col-xl-6">
          <div className="setting-list-item">
            <h4>Markup %</h4>
            <p>
              Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
              markup means that a product that costs £100 will be on sale for £140.
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 selector-container">
          <Input value="30" className="blue-input" />
        </div>
      </div>

      <div className="row settings-list">
        <div className="col-12 col-xl-6">
          <div className="setting-list-item">
            <h4>Markup %</h4>
            <p>
              Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
              markup means that a product that costs £100 will be on sale for £140.
            </p>
          </div>
        </div>
        <div className="col-12 col-xl-5 selector-container">
          <Input value="30" className="blue-input" />
        </div>
      </div>
    </>
  );
};
