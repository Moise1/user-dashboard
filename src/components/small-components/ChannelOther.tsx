import { Input, Row, Col } from 'antd';

export const ChannelOther = () => {
  return (
    <>
      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>eBay username</h4>
          <p>
            This value needs to match your actual eBay username, otherwise the extension won&apos;t be able to connect.
          </p>
        </Col>
        <Col span={8}>
          <Input value="30" className="blue-input" />
        </Col>
      </Row>

      <Row className="description-and-controls">
        <Col span={12} className="description-area">
          <h4>Fees Percentage</h4>
          <p>
            To calculate the profit earned on every listing (eBay FVF, PayPal Fee...). It is just an estimation and it
            doesn&apos;t affect your prices.
          </p>
        </Col>
        <Col span={8}>
          <Input value="30" className="blue-input" />
        </Col>
      </Row>
    </>
  );
};
