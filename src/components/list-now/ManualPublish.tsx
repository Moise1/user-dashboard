/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Row, Col } from 'antd';
import { getManualListings } from '../../redux/listings/listingsThunk';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { ReactChild, ReactFragment, ReactPortal, useEffect } from 'react';
import { getSources } from '../../redux/sources/sourcesThunk';
import '../../sass/list-now/manual-listing.scss';
import { Link } from 'react-router-dom';
import { ManualListingState } from '../../redux/listings/manualListingsSlice';

export const ManualPublish = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  //const { sources, loading } = useAppSelector((state) => state.sources);
  const { manualListings, loading } = useAppSelector((state) => state.manualListings as ManualListingState);

  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);

  useEffect(() => {
    dispatch(getManualListings());
  }, [getManualListings]);

  //console.log('test', sources?.sourceName);

  return (
    <div className="manual-list-content">
      <div className="container-manual-listing">
        <div className="list-card">
          <Row>
            <Col md={12} xs={24}>
              <div className="card-info">
                <h4>
                  <li>
                    Download our <a href="/browser-extensions">listing extension.</a>
                  </li>
                  <li>Choose your favourite supplier.</li>
                  <li>Choose the product you want to list.</li>
                  <li>Click on the extension on your browser.</li>
                  <li>Edit the information as you wish to list it and click on ‘List’.</li>
                  <li>You are done! Your item will soon appear under your Active listing section.</li>
                </h4>

                <p>
                  NOTE: If your listing comes up with an error you can check your{' '}
                  <Link to={'/products'}>Products{' > '}Pending products</Link> and see further detail.
                </p>
              </div>
            </Col>
            <Col md={12} xs={24}>
              <div className="manual-listing-vid">
                <iframe
                  className="intro-vid"
                  src={'https://www.youtube.com/embed/P-CjSHtd4mQ'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="section-sources">
          <h2>Suported suppliers</h2>
          {/*{sources.map((itm: { sourceId: number | undefined; sourceBaseUrl: string | undefined; sourceName: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {*/}
          {/*  return <Col span={6} key={itm.sourceId}>*/}
          {/*    <a href={'ChannelListing/BuyNow?sourceUrl=' + itm.sourceBaseUrl} target="_blank" rel="noreferrer">*/}
          {/*      <div className="list-card"> {loading}*/}
          {/*        <img width="159" height="38" alt="sourcelogo" src={require('../../assets/logos/' + itm.sourceId + '.png').default} ></img>*/}
          {/*        <br />*/}
          {/*        <h3>{itm.sourceName}</h3>*/}
          {/*      </div>*/}
          {/*    </a>*/}
          {/*  </Col>;*/}
          {/*})}*/}
          <Row gutter={[16, 8]}>
            {manualListings.moreSources?.map(
              (itm: {
                id: number | undefined;
                name: string | undefined;
                baseUrl: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;
              }) => {
                return (
                  <Col span={6} key={itm.id}>
                    <a href={'ChannelListing/BuyNow?sourceUrl=' + itm.baseUrl} target="_blank" rel="noreferrer">
                      <div className="list-card">
                        {loading}
                        {/*eslint-disable @typescript-eslint/no-var-requires */}
                        <img
                          width="159"
                          height="38"
                          alt="sourcelogo"
                          src={require('../../assets/logos/' + itm.id + '.png').default}
                        />
                        <br />
                        <h3>{itm.name}</h3>
                      </div>
                    </a>
                  </Col>
                );
              }
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};
