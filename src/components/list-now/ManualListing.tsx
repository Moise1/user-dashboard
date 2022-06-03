/*import { useState } from 'react';*/
/*import { t } from '../../utils/transShim';*/
import { Row, Col } from 'antd';

import '../../sass/list-now/manual-listing.scss';
import { getSources } from '../../redux/source-config/sourcesThunk';
import { useAppDispatch, useAppSelector } from '../../custom-hooks/reduxCustomHooks';
import { useEffect } from 'react';

export const ManualListing = (/*props: props*/) => {
  const dispatch = useAppDispatch();
  const { sources, loading } = useAppSelector((state) => state.sources);

  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);

  console.log('The value of showAccConfig', loading);
  console.log('The value of showAccConfig', sources);

  console.log('test', sources?.sourceName);

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

                <h4>
                  NOTE: If your listing comes up with an error you can check your{' '}
                  <a href="#">My Listings{' > '}Pending Listings</a> and see further detail.
                </h4>
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
          <div className="card-supplier">
            {loading && 'Please wait a moment...'}
            <img alt="sourcelogo"></img>
            <h3>asd</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
