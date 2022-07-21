import React, { useEffect, Fragment, useMemo, useState } from 'react';
import { Layout, Menu } from 'antd';
import { StatusBar } from '../../small-components/StatusBar';
import { StatusBtn } from '../../small-components/StatusBtn';
import { t } from '../../utils/transShim';
import { useAppSelector, useAppDispatch } from '../../custom-hooks/reduxCustomHooks';
import {
  getActiveListings,
  getActiveListingsImages,
  getPendingListings,
  getTerminatedListings
} from 'src/redux/listings/listingsThunk';
import {
  ActiveListing,
  ActiveListingsImagesDictionary,
  ListingsState,
  PendingListing
} from 'src/redux/listings/listingsSlice';
import '../../sass/listings.scss';
import '../../sass/tables/complex-table.scss';
import { ReactUtils } from '../../utils/react-utils';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Links } from '../../links';
import { ActiveListingsColumns, ActiveListingsColumnsVisibleByDefault } from './Listings/active-columns';
import { ListingsColumns, ListingT } from './Listings/columns';
import { PendingListingsColumns } from './Listings/pending-columns';
import { TerminatedListingsColumns } from './Listings/terminated-columns';
import { ComplexTable } from '../../small-components/tables/complex-table';
import { ListNow } from '../list-now/ListNow';
import { getSources } from '../../redux/sources/sourcesThunk';
import { Source, SourcesState } from '../../redux/sources/sourceSlice';
import { ImportListings } from './ImportListings';

enum ListingTab {
  active,
  pending,
  terminated,
  import
}
type Selection = {
  listings: ListingT[];
  keys: number[];
};

export const Listings = () => {
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const dispatch = useAppDispatch();

  //ADDITIONAL DATA--------------------------------------------------------------------------
  const { sources, loading: loadingSources } = useAppSelector((state) => state.sources as SourcesState);
  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);
  const sourcesDic = sources ? new Map<number, Source>(sources.map((x) => [x.id, x])) : null;
  //-----------------------------------------------------------------------------------------
  //TAB--------------------------------------------------------------------------------------
  const tab = (() => {
    if (useRouteMatch(Links.ProductsPending)) return ListingTab.pending;
    if (useRouteMatch(Links.ProductsTerminated)) return ListingTab.terminated;
    if (useRouteMatch(Links.ProductsImport)) return ListingTab.import;
    return ListingTab.active;
  })();
  //------------------------------------------------------------------------------------------
  //DATA--------------------------------------------------------------------------------------
  useEffect(() => {
    switch (tab) {
      case ListingTab.active:
        dispatch(getActiveListings());
        break;
      case ListingTab.pending:
        dispatch(getPendingListings());
        break;
      case ListingTab.terminated:
        dispatch(getTerminatedListings());
        break;
    }
  }, [getPendingListings, getTerminatedListings, getActiveListings, selectedChannel?.id]);

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
      case ListingTab.import:
        history.push(Links.ProductsImport);
        break;
    }
  };

  const { defaultVisibleColumns, hideWhenEmpty, listings, loadingListings, columnList, activeListingsImages } = (() => {
    const {
      activeListings,
      loadingActive,
      terminatedListings,
      pendingListings,
      loadingPending,
      loadingTerminated,
      activeListingsImages
    } = useAppSelector((state) => state.listings as ListingsState);

    const AddExtraData = (data: ListingT[] | null | undefined) => {
      if (!data || !sourcesDic) return data;
      return data.map(
        (x) => ({ ...x, source: sourcesDic.get(x.sourceId), channel: selectedChannel, key: x.id } as ListingT)
      );
    };
    const AddImages = (data: ListingT[] | null | undefined, activeListingsImages?: ActiveListingsImagesDictionary) => {
      if (!data || !activeListingsImages) return data;
      for (const d of data) {
        const ud = activeListingsImages[d.channelListingId];
        if (ud && !ud.loading && ud.url) {
          (d as ActiveListing | PendingListing).imageUrl = ud.url;
        }
      }
      return data;
    };

    switch (tab) {
      default:
      case ListingTab.active:
        return {
          defaultVisibleColumns: ActiveListingsColumnsVisibleByDefault,
          columnList: ActiveListingsColumns,
          hideWhenEmpty: true,
          listings: AddImages(AddExtraData(activeListings as ListingT[] | null | undefined), activeListingsImages),
          loadingListings: loadingActive,
          activeListingsImages
        };
      case ListingTab.pending:
        return {
          defaultVisibleColumns: PendingListingsColumns,
          columnList: PendingListingsColumns,
          hideWhenEmpty: false,
          listings: AddExtraData(pendingListings as ListingT[] | null | undefined),
          loadingListings: loadingPending,
          activeListingsImages: undefined
        };
      case ListingTab.terminated:
        return {
          defaultVisibleColumns: TerminatedListingsColumns,
          columnList: TerminatedListingsColumns,
          hideWhenEmpty: false,
          listings: AddExtraData(terminatedListings as ListingT[] | null | undefined),
          loadingListings: loadingTerminated,
          activeListingsImages: undefined
        };
    }
  })();

  useEffect(() => {
    if (listings) return;
    switch (tab) {
      case ListingTab.active:
        dispatch(getActiveListings());
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

  const filteredColumns = useMemo(
    () => ListingsColumns.filter((x) => columnList.includes(x.id)),
    [ListingsColumns, columnList]
  );

  //Row Selection
  const [selectedRows, setSelectedRows] = useState<Selection>({ listings: [], keys: [] });
  const onSelectChange = (keys: React.Key[], rows: ListingT[]) =>
    setSelectedRows({ listings: rows, keys: keys as number[] });
  //
  //Bulk Menu-----------------------------------------------------------------
  const handleSingleListingModal = () => {
    console.log('x');
  };
  const handleBulkListingModal = () => {
    console.log('y');
  };
  const actionsDropdownMenu = useMemo(
    () => (
      <Menu
        items={[
          {
            type: 'group',
            label: (
              <div
                className="action-option"
                onClick={selectedRows?.keys?.length === 1 ? handleSingleListingModal : handleBulkListingModal}
              >
                Edit <strong>{selectedRows?.keys?.length}</strong>
              </div>
            )
          },
          {
            type: 'group',
            label: (
              <div className="action-option">
                Copy <strong>{selectedRows?.keys?.length}</strong>
              </div>
            )
          },
          {
            type: 'group',
            label: (
              <div className="action-option">
                Optimize <strong>{selectedRows?.keys?.length}</strong>
              </div>
            )
          }
        ]}
      />
    ),
    [selectedRows?.keys?.length]
  );
  //--------------------------------------------------------------------------
  //Load images for active listings-------------------------------------------

  const onChangeVisibleRows = (rows: ListingT[]) => {
    if (tab != ListingTab.active) return;

    const imgToLoad: number[] = [];
    for (const r of rows) {
      if (!r.imageUrl && !(activeListingsImages ?? {})[r.channelListingId]?.loading) {
        imgToLoad.push(r.channelListingId);
      }
    }
    if (imgToLoad.length > 0) dispatch(getActiveListingsImages(imgToLoad));
  };
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
        <StatusBtn
          title={`${t('ImportListings')}`}
          changeTab={handleChangeTab}
          className={tab === ListingTab.import ? 'active-tab' : ''}
          id={ListingTab.import.toString()}
        />
      </StatusBar>
      {tab === ListingTab.import ? (
        <ImportListings />
      ) : (
        <Fragment>
          <ComplexTable
            uiIdentifier={'listings_' + tab}
            data={(listings ?? []) as ListingT[]}
            allColumnData={filteredColumns}
            defaultVisibleColumns={defaultVisibleColumns}
            hideWhenEmpty={hideWhenEmpty}
            loadingData={loadingListings || loadingSources}
            onChangeVisibleRows={onChangeVisibleRows}
            actionsDropdownMenu={selectedRows?.keys?.length > 0 ? actionsDropdownMenu : undefined}
            rowSelection={{
              selectedRowKeys: selectedRows?.keys,
              onChange: onSelectChange
            }}
          />
          {tab == ListingTab.active && listings?.length == 0 && <ListNow />}
        </Fragment>
      )}
    </Layout>
  );
};
