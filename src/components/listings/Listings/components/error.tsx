import { Button, Col, Row } from 'antd';
import { useState } from 'react';
import { eCountry } from '../../../../data/countries';
import { ePlatform, Platforms } from '../../../../data/platforms';
import { SafeHtmlWrapper } from '../../../../small-components/safe-html-wrapper';
import { TTag } from '../../../../utils/transShim';
import { PopupModal } from '../../../modals/PopupModal';
import { TryGetSolutionAmazon } from './error-solutions/solutions-amazon';
import { TryGetSolutionEbay } from './error-solutions/solutions-ebay';
import { TryGetSolutionShopify } from './error-solutions/solutions-shopify';

interface Props {
  errrorMessage: string;
  channelId: ePlatform;
  country: eCountry;
  errorSourceInfo: string;
}

export const ErrorComponent = (props: Props) => {
  const { errrorMessage, channelId, country, errorSourceInfo } = props;
  const [showModal, setShowModal] = useState<boolean>(false);

  const RenderErrorMessage = () => {
    const ar = errrorMessage?.split('\n') ?? [];


    const solution = (() => {
      switch (channelId) {
        case ePlatform.eBay:
        case ePlatform.eBayNoApi:
          return TryGetSolutionEbay(country, errrorMessage, errorSourceInfo);
        case ePlatform.Amazon:
          return TryGetSolutionAmazon();
        case ePlatform.Shopify:
          return TryGetSolutionShopify();
      }
    })();

    const RenderSolution = (solution: JSX.Element[]) => {
      return (
        <>
          <b>How to solve it:</b>
          {solution}
        </>
      );
    };



    const externalStyle = { border: '1px solid #ccc', borderRadius: 5, padding: 10, backgroundColor: 'rgba(0,0,0,0.02)' };
    return (
      <>
        {channelId && (
          <b>Please note that these error(s) come from {Platforms[channelId].name}:</b>
        )}
        {ar.map((x, i) => {
          const potentialHtml = x; //.replace("\"\"","\"")

          return <p key={i} style={externalStyle}>
            <SafeHtmlWrapper html={potentialHtml} />
          </p>;
        })}
        {solution && RenderSolution(solution)}
      </>
    );
  };

  return (
    <>
      <a href='#' className='errorF' onClick={() => setShowModal(true)}>
        <span className='errorFM'>{errrorMessage}</span>
      </a>
      <br />
      <Button className='progress-btn' onClick={() => setShowModal(true)}>
        Click for details and how to fix it
      </Button>
      <PopupModal
        closable={true}
        open={showModal}
        handleClose={() => setShowModal(false)}
        width={600}
        title={
          <div className='modal-title'>
            <h5><TTag lKey='Listings.Value.ErrorInformation' /></h5>
          </div>
        }
        footer={
          <Row justify="space-between">
            <Col flex="none">
              <Button className='confirm-btn'>
                <TTag lKey='Listings.Button.Edit' />
              </Button>
            </Col>
            <Col flex="none">
              <Button className='confirm-btn'>
                <TTag lKey='Listings.Button.Retry' />
              </Button>
            </Col>
          </Row>
        }
      >
        {RenderErrorMessage()}
      </PopupModal>
    </>
  );
};