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
import {  ActiveListingsImagesDictionary, ListingsState } from 'src/redux/listings/listingsSlice';
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
import { getSources } from '../../redux/sources/sourcesThunk';
import { Source, SourcesState } from '../../redux/sources/sourceSlice';
import { ActiveListingExtended, ListingT } from './Listings/types';
import { getComputedConfiguration } from '../../redux/source-configuration/sources.coonfiguration-thunk';
import { SourceConfigurationState } from '../../redux/source-configuration/source-configuration-slice';
import { ePlatform } from '../../types/ePlatform';
import { isString } from 'util';

enum ListingTab {
  active, pending, terminated, import
}
type Selection = {
  listings: ListingT[],
  keys: number[]
}

export const Listings = () => {
  const dispatch = useAppDispatch();

  //ADDITIONAL DATA--------------------------------------------------------------------------
  const selectedChannel = ReactUtils.GetSelectedChannel();
  const { sources, loading: loadingSources } = useAppSelector((state) => state.sources as SourcesState);
  useEffect(() => {
    dispatch(getSources());
  }, [getSources]);
  const sourcesDic = sources ? new Map<number, Source>(sources.map(x => ([x.id, x]))) : null;
  const { settings: computedConfiguration, loading: loadingComputedConfiguration } = useAppSelector((state) => (state.sourcesConfiguration as SourceConfigurationState)?.computedConfiguration ?? {});
  useEffect(() => {
    dispatch(getComputedConfiguration());
  }, [getComputedConfiguration]);
  //-----------------------------------------------------------------------------------------
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
    }
  };

  const { defaultVisibleColumns, hideWhenEmpty, listings, loadingListings, columnList, activeListingsImages } = (() => {

    //This first only return informatinio depending of the active tab
    const data1 = (() => {
      const { activeListings, loadingActive, terminatedListings, pendingListings, loadingPending, loadingTerminated, activeListingsImages } = useAppSelector((state) => state.listings as ListingsState);

      switch (tab) {
        default:
        case ListingTab.active:
          return {
            defaultVisibleColumns: ActiveListingsColumnsVisibleByDefault[selectedChannel?.channelId ?? ePlatform.eBay],
            columnList: ActiveListingsColumns[selectedChannel?.channelId ?? ePlatform.eBay],
            hideWhenEmpty: true,
            listings: activeListings as ListingT[],
            loadingListings: loadingActive || loadingComputedConfiguration,
            activeListingsImages: activeListingsImages
          };
        case ListingTab.pending:
          return {
            defaultVisibleColumns: PendingListingsColumns,
            columnList: PendingListingsColumns,
            hideWhenEmpty: false,
            listings: pendingListings as ListingT[],
            loadingListings: loadingPending,
            activeListingsImages: undefined
          };
        case ListingTab.terminated:
          return {
            defaultVisibleColumns: TerminatedListingsColumns,
            columnList: TerminatedListingsColumns,
            hideWhenEmpty: false,
            listings: terminatedListings as ListingT[],
            loadingListings: loadingTerminated,
            activeListingsImages: undefined
          };
      }
    })();

    const listings =
      //We use memo here to avoid recalculating constantly. data 1 is outside this memo so we can 
      //use JSON.stringify only in data1.listings, otherwiese we would be forced to stringinfy activelistings, pendinglistings and terminatedListings
      useMemo(() => {
        const AddExtraData = (data: ListingT[] | null | undefined) => {
          if (!data || !sourcesDic) return data;
          return data.map(x => ({ ...x, source: sourcesDic.get(x.sourceId), channel: selectedChannel, key: x.id } as ListingT));
        };

        const ExtendActive = (listings: ListingT[] | null | undefined, activeListingsImages?: ActiveListingsImagesDictionary) => {
          if (!listings) return listings;

          for (const al of listings) {
            const l = al as ActiveListingExtended;//Actually it is not, it is a ActiveListing, but... javascript. It will work without needing of creating a new object

            //Calculated fields-------------------
            const settings = computedConfiguration?.[l.sourceId];
            if (settings) {
              l.profit = l.channelPrice - l.sourcePrice - (l.channelPrice * settings.feePercentage) / 100;
              l.markup = l.overrides.markup ?? settings.markup;
              l.monitorStock = l.overrides.monitorStock ?? settings.monitorStock;
              l.monitorPrice = l.overrides.monitorPrice ?? settings.monitorPrice;
              l.monitorPriceDecrease = l.overrides.monitorPriceDecrease ?? settings.monitorPriceDecrease;
              l.monitorPriceDecreasePercentage = l.overrides.monitorPriceDecreasePercentage ?? settings.monitorPriceDecreasePercentage;
              l.ignoreRules = l.overrides.ignoreRules ?? settings.ignoreRules;
              l.variationsText = (() => {
                const GetVariationSKU = (data: ListingT) => {
                  const cis = (data as { channelItem: string }).channelItem.split('#');
                  return (cis.length == 2) ? cis[1] : '';
                };
                const value = l.variationAtributes;
                if (!value || value.length == 0)
                  return GetVariationSKU(al);
                const ops = value.map((x) => x.option).join(', ');
                return (ops && ops.trim().length > 0) ? ops : GetVariationSKU(al);
              })();
              l.unsoldDays = (() => {
                const d = l.lastTimeSold ?? l.createdOn;
                const ld = isString(d) ? new Date(d) : d;
                return Math.floor((new Date().getTime() - ld.getTime()) / 86400000);
              })();
              l.outOfStockDays = (() => {
                const d = l.lastTimeInStock ?? l.createdOn;
                const ld = isString(d) ? new Date(d) : d;
                return Math.floor((new Date().getTime() - ld.getTime()) / 86400000);
              })();
              l.dispatchDays = l.overrides.dispatchDays ?? settings.dispatchDays;
            }

            //Images-------------------
            if (activeListingsImages) {
              const ud = activeListingsImages[l.channelListingId];
              if (ud && !ud.loading && ud.url) {
                l.imageUrl = ud.url;
              }
            }
          }

          return listings;
        };

        switch (tab) {
          default:
          case ListingTab.active:
            return ExtendActive(AddExtraData(data1.listings), data1.activeListingsImages);
          case ListingTab.pending:
            return AddExtraData(data1.listings);
          case ListingTab.terminated:
            return AddExtraData(data1.listings);
        }
      }, [tab, JSON.stringify(data1.listings), data1.activeListingsImages, computedConfiguration]) as ListingT[] | null | undefined;

    return {...data1, listings};
  })();

  useEffect(() => {
    if (listings)
      return;
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

  const filteredColumns = useMemo(() => ListingsColumns.filter(x => columnList.includes(x.id)), [ListingsColumns, columnList]);

  //Row Selection
  const [selectedRows, setSelectedRows] = useState<Selection>({ listings: [], keys:[] });
  const onSelectChange = (keys: React.Key[], rows: ListingT[]) => setSelectedRows({ listings: rows, keys: keys as number[] });
  //
  //Bulk Menu-----------------------------------------------------------------
  const handleSingleListingModal = () => { console.log('x'); };
  const handleBulkListingModal = () => { console.log('y'); };
  const actionsDropdownMenu = useMemo(() => (
    <Menu
      items={[
        {
          type: 'group',
          label: (
            <div
              className="action-option"
              onClick={selectedRows?.keys?.length === 1 ? handleSingleListingModal : handleBulkListingModal}
            >
              Edit  <strong>{selectedRows?.keys?.length}</strong>
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
    />)
  , [selectedRows?.keys?.length]);
  //--------------------------------------------------------------------------
  //Load images for active listings-------------------------------------------

  const onChangeVisibleRows = (rows: ListingT[]) => {
    if (tab != ListingTab.active)
      return;

    const imgToLoad: number[] = [];
    for (const r of rows) {
      if (!r.imageUrl && !(activeListingsImages ?? {})[r.channelListingId]?.loading) {
        imgToLoad.push(r.channelListingId);
      }
    }
    if (imgToLoad.length > 0)
      dispatch(getActiveListingsImages(imgToLoad));
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
      </StatusBar>
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
    </Layout>
  );
};