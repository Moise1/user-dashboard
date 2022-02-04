import { Card, Button } from 'antd';
import tokenCoin from '../../assets/tokenCoin.png';
import '../../sass/light-theme/buy-tokens.scss';

export const BuyTokens = () => {
  const data = [
    {
      id: 1,
      coin: tokenCoin,
      tokens: 30,
      euros: 11.99,
      cents: 39,
      buyText: 'Buy Now'
    },
    {
      id: 2,
      coin: tokenCoin,
      tokens: 150,
      euros: 44.99,
      cents: 29,
      buyText: 'Buy Now'
    },
    {
      id: 3,
      coin: tokenCoin,
      tokens: 600,
      euros: 144.99,
      cents: 24,
      buyText: 'Buy Now'
    }
  ];
  return (
    <div className="buy-tokens-container">
      <div className="text-container">
        <h1 className="buy-tokens-title">Buy Tokens</h1>
        <p className="buy-tokens-sub-title">We optimize your listing titles for you!</p>

        <p className="buy-tokens-desc">
          With each token we can optimize on title. We use our algorithm to choose the title the best keyword for your
          product. As you know, optimizing your titles offers the following benefits:
        </p>

        <ul className="benefits">
          <li>Ranking higher on eBay&apos;s search results</li>
          <li>We analyse sold items by category</li>
          <li>Bootst your sales.</li>
          <li>Get your listings in front of more potential buyers </li>
          <li>Save time, we do hard work for you.</li>
        </ul>
      </div>
      <div className="cards-container">
        {data.map((d) => (
          <Card key={d.id} className="card">
            <div className="card-info">
              <p className="tokens-count">
                <strong>{d.tokens} Tokens</strong>
              </p>
              <img src={d.coin} alt="coin img" className="coin" />
              <p className="euros-amount">
                <span>&euro;</span>
                {d.euros}
              </p>
              <p className="cents-amount">{d.cents} cent/token</p>

              <Button className="buy-btn">{d.buyText}</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
