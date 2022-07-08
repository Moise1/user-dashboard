import React, { useEffect, Fragment } from 'react';
import { Layout, Spin } from 'antd';
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
import { ListNow } from '../list-now/ListNow';
import { ReactUtils } from '../../utils/react-utils';
import { DataTable } from '../../small-components/data-table';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Links } from '../../links';
import { ActiveListingsColumns } from './Columns/active-columns';
import { ColumnData, ListingsColumns, TableColumnId } from './Columns/columns';
import { PendingListingsColumns } from './Columns/pending-columns';
import { TerminatedListingsColumns } from './Columns/terminated-columns';

type ListingT = ActiveListing | PendingListing | TerminatedListings;//TODO: This is a disaster but I am tired of fixing all your type mess
enum ListingTab {
  active, pending, terminated, import
}

export const Listings = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();

  const tab = (() => {
    if (useRouteMatch(Links.ProductsPending))
      return ListingTab.pending;
    if (useRouteMatch(Links.ProductsTerminated))
      return ListingTab.terminated;
    //if (useRouteMatch(Links.ProductsImport))
    //return ListingTab.import;
    return ListingTab.active;
  })();

  const { listings, loading } = (() => {
    const { activeListings, loadingActive, terminatedListings, pendingListings, loadingPending, loadingTerminated } = useAppSelector((state) => state.listings as ListingsState);
    switch (tab) {
      default:
      case ListingTab.active:
        return { listings: activeListings as ListingT[], loading: loadingActive };
      case ListingTab.pending:
        return { listings: pendingListings as ListingT[], loading: loadingPending };
      case ListingTab.terminated:
        return { listings: terminatedListings as ListingT[], loading: loadingTerminated };
    }
  })();
  
  const dispatch = useAppDispatch();

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

  const columns = (() => {
    const GetColumns = (cs: ColumnData[], ids: TableColumnId[]) => ListingsColumns.filter(x => ids.includes(x.id)).map(x => ({ ...x, title: t(x.title), key: x.id.toString() }));

    switch (tab) {
      default:
      case ListingTab.active:
        return GetColumns(ListingsColumns, ActiveListingsColumns);
      case ListingTab.pending:
        return GetColumns(ListingsColumns, PendingListingsColumns);
      case ListingTab.terminated:
        return GetColumns(ListingsColumns, TerminatedListingsColumns);
    }
  })();

  const filteredData = listings /*? useTableSearch(searchTxt, () => listings) : listings*/;

  return (
    <Layout className="listings-container">
      <Fragment>
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
            id={ListingTab.terminated.toString() }
          />
        </StatusBar>

        {loading && (
          <Layout className="listings-container">
            <Spin />
          </Layout>
        )}
        {!loading && <>
          {(tab != ListingTab.active || (listings?.length ?? 0) > 0) &&
            <DataTable
              page="listing"
              isListingsTable={true}
              columns={columns}
              dataSource={filteredData as ListingT[]}
              totalItems={listings?.length}
              showTableInfo={true}
              rowClassName="table-row"
            />
          }
          {tab == ListingTab.active && listings?.length == 0 && <ListNow />}
        </>}
      </Fragment>
    </Layout>
  );
};