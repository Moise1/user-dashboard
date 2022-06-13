 import { Row, Col } from 'antd';
 import { dummyData } from 'src/dummy-data/dummyData';
import { Selector } from '../../../small-components/form/selector';
import { Switch } from '../../../small-components/Switch';

 export const SourcesSettingsContents = () => {
   return (
     <div className="sources-settings-contents">
       <Row gutter={[{xs:32, lg:80}, 0]} className="row">
         <Col xs={16} lg={10} className="description-area">
           <h2>Markup %</h2>
           <p>
             Percentage added to supplier’s price, which will determine the price of your products. For example, a 40%
             markup means that a product that costs £120 will be on sale for £140.
           </p>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]}className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Default template</h2>
           <p>
             Define the look and feel of your listings. You can see different options under the{' '}
             <span className="blue-normal-text">Settings</span>
             <span className="blue-normal-text"> &gt; Templates</span>
           </p>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Monitor stock</h2>
           <p>
             If the supplier is out of stock of a product, we will prevent people from buying it on your store. When it
             is available again, we will automatically update your store again.
           </p>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Monitor price</h2>
           <p>
             If the supplier changes the price of a product, we will automatically update accordingly to keep your profit
             with the corresponding markup.
           </p>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Price descrease</h2>
           <p>
             If the supplier reduces the price of a product, we will also reduce it in your store. If you turn this off,
             we will only update the price when it goes up in the supplier’s catalog.
           </p>
         </Col>
         <Col className="selector-container" xs={7} lg={13}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Returns</h2>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Shipping</h2>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Dispatch Days</h2>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>GSP</h2>
         </Col>
         <Col className="switch-container" xs={7} lg={12}>
           <Switch />
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Overwrite Item Postcode</h2>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>

       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Overwrite Item City</h2>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>
       <Row gutter={[{xs:32, lg:200}, 0]} className="row">
         <Col className="description-area" xs={16} lg={12}>
           <h2>Overwrite Item Country Code</h2>
         </Col>
         <Col className="selector-container" xs={7} lg={12}>
           <Selector defaultValue={dummyData[0].id}>{dummyData?.map(x => ({ value: x.id, label: x.value }))}</Selector>
         </Col>
       </Row>
     </div>
   );
 };

export {};
