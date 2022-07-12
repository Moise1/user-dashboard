import React, { useEffect, Fragment } from 'react';
import { Layout } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import {
  getListings,
  getPendingListings,
  getTerminatedListings
} from 'src/redux/listings/listingsThunk';
import { ActiveListing, ListingsState, PendingListing, TerminatedListings } from 'src/redux/listings/listingsSlice';
import '../../sass/listings.scss';
import '../../sass/tables/complex-table.scss';
import { ReactUtils } from '../../utils/react-utils';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Links } from '../../links';
import { ActiveListingsColumns, ActiveListingsColumnsVisibleByDefault } from './Listings/active-columns';
import { ListingsColumns } from './Listings/columns';
import { PendingListingsColumns } from './Listings/pending-columns';
import { TerminatedListingsColumns } from './Listings/terminated-columns';

import { ComplexTable } from '../../small-components/tables/complex-table';
import { ListNow } from '../list-now/ListNow';

type ListingT = ActiveListing | PendingListing | TerminatedListings;//TODO: This is a disaster but I am tired of fixing all your type mess
enum ListingTab {
  active, pending, terminated, import
}

export const Listings = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const dispatch = useAppDispatch();

  //TAB--------------------------------------------------------------------------------------
  const tab = (() => {
    if (useRouteMatch(Links.ProductsPending))
      return ListingTab.pending;
    if (useRouteMatch(Links.ProductsTerminated))
      return ListingTab.terminated;
    //if (useRouteMatch(Links.ProductsImport))
    //return ListingTab.import;
    return ListingTab.active;
  })();
  //------------------------------------------------------------------------------------------


  //DATA--------------------------------------------------------------------------
  useEffect(() => {
    switch (tab) {
      case ListingTab.active:
        dispatch(getListings());
        break;
      case ListingTab.pending:
        dispatch(getPendingListings());
        break;
      case ListingTab.terminated:
        dispatch(getTerminatedListings());
        break;
    }
  }, [getPendingListings, getTerminatedListings, getListings, selectedChannel?.id]);

  const history = useHistory();
  const handleChangeTab = (e: React.MouseEvent): void => {
    switch (parseInt(e.currentTarget.getAttribute('id') ?? '0')) {
      default:
      case ListingTab.active:
        history.push(Links.Products);
        break;
      case ListingTab.pending:
        history.push(Links.ProductsPending);
        break;
      case ListingTab.terminated:
        history.push(Links.ProductsTerminated);
        break;
    }
  };

  const { defaultVisibleColumns, hideWhenEmpty, listings, loading, columnList } = (() => {
    const { activeListings, loadingActive, terminatedListings, pendingListings, loadingPending, loadingTerminated } = useAppSelector((state) => state.listings as ListingsState);

    switch (tab) {
      default:
      case ListingTab.active:
        return {
          defaultVisibleColumns: ActiveListingsColumnsVisibleByDefault,
          columnList: ActiveListingsColumns,
          hideWhenEmpty: true,
          listings: activeListings as ListingT[],
          loading: loadingActive
        };
      case ListingTab.pending:
        return {
          defaultVisibleColumns: PendingListingsColumns,
          columnList: PendingListingsColumns,
          hideWhenEmpty: false,
          listings: pendingListings as ListingT[],
          loading: loadingPending
        };
      case ListingTab.terminated:
        return {
          defaultVisibleColumns: TerminatedListingsColumns,
          columnList: TerminatedListingsColumns,
          hideWhenEmpty: false,
          listings: terminatedListings as ListingT[],
          loading: loadingTerminated
        };
    }
  })();

  useEffect(() => {
    if (listings)
      return;
    switch (tab) {
      case ListingTab.active:
        dispatch(getListings());
        break;
      case ListingTab.pending:
        dispatch(getPendingListings());
        break;
      case ListingTab.terminated:
        dispatch(getTerminatedListings());
        break;
    }
  }, [tab]);
  //--------------------------------------------------------------------------


  return (
    <Layout className="listings-container">
      <StatusBar>
        <StatusBtn
          title={`${t('ActiveListings')}`}
          changeTab={handleChangeTab}
          className={tab === ListingTab.active ? 'active-tab' : ''}
          id={ListingTab.active.toString()}
        />
        <StatusBtn
          title={`${t('PendingListings')}`}
          changeTab={handleChangeTab}
          className={tab === ListingTab.pending ? 'active-tab' : ''}
          id={ListingTab.pending.toString()}
        />
        <StatusBtn
          title={`${t('TerminatedListings')}`}
          changeTab={handleChangeTab}
          className={tab === ListingTab.terminated ? 'active-tab' : ''}
          id={ListingTab.terminated.toString()}
        />
      </StatusBar>
      <Fragment>
        <ComplexTable
          uiIdentifier={'listings_' + tab}
          data={listings}
          allColumnData={ListingsColumns}
          columnList={columnList}
          defaultVisibleColumns={defaultVisibleColumns}
          hideWhenEmpty={hideWhenEmpty}
          loadingData={loading}
        />
        {tab == ListingTab.active && listings?.length == 0 && <ListNow />}
      </Fragment>
    </Layout>
  );
};