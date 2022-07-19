import { Card, Button, Form } from 'antd';
import { buyTokens } from 'src/redux/tokens/tokensThunk';
import tokenCoin from '../../assets/tokenCoin.png';
import { useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import {BillingPeriod} from '../../utils/billingPeriod';
import '../../sass/buy-tokens.scss';

export const BuyTokens = () => {
  const dispatch = useAppDispatch();
  const data = [
    {
      id: 1,
      productId: 21,
      sku: 'sku_I3tks3dfom0Npg',
      coin: tokenCoin,
      tokens: 30,
      euros: 11.99,
      cents: 39,
      buyText: 'Buy Now'
    },
    {
      id: 2,
      productId: 22,
      sku: 'sku_I3tpbfFR7yaQFo',
      coin: tokenCoin,
      tokens: 150,
      euros: 44.99,
      cents: 29,
      buyText: 'Buy Now'
    },
    {
      id: 3,
      productId: 33,
      sku: 'price_1HTm4VBVFd6MOE2R4lu1AKx8',
      coin: tokenCoin,
      tokens: 600,
      euros: 144.99,
      cents: 24,
      buyText: 'Buy Now'
    }
  ];

  const redirectUrl = 'https://app.hustlegotreal.com/catalog/PaymentConfirmation';
  const onFinish = (sku: string, productId: number) => {
    const data = {
      lineItems: [
        {
          platformProductId: sku,
          quantity: 1
        }
      ],
      mode: 'payment',
      successUrl: `${redirectUrl}?success=true&bp=${BillingPeriod.Unique}&pid=${productId}`,
      cancelUrl: `${redirectUrl}?success=false&bp=${BillingPeriod.Unique}&pid=${productId}`,
      upgradingSubscription: false
    };
    dispatch(buyTokens(data));
  };
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
            <Form onFinish={() => onFinish(d.sku, d.productId)}>
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
                <Button className="buy-btn" htmlType="submit">
                  {d.buyText}
                </Button>
              </div>
            </Form>
          </Card>
        ))}
      </div>
    </div>
  );
};

// async function OnClick(sku) {
//   var stripe = Stripe("pk_live_9ZqUQknYIUpCPmPb9cjOsup4");
//   $.ajax({
//       type: "POST",
//       url: 'Catalog/CreateCheckoutSession?price='+ sku,
//       dataType: 'json',
//       success: function (response) {
//           console.log(response);
//           stripe.redirectToCheckout({
//               sessionId: response.checkoutSessionId
//           });
//       }
//   })
//   //const response = await rq.postJson<>(this.props.createCheckoutSessionUrl + '?price=' + sku, null);
// }
