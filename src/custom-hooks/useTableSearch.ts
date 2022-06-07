// import { AsyncThunk } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import { PendingListings, TerminatedListings } from 'src/redux/listings/listingsSlice';
import { ActiveListing } from 'src/redux/unmap';

interface Props {
  searchTxt: string | null;
  dataSource: () => Array<ListingsStatusType>;
}
export type ListingsStatusType = ActiveListing | PendingListings | TerminatedListings;
type KeyType = string | number | null | undefined | ActiveListing;

export const useTableSearch = ({searchTxt, dataSource}: Props) => {
  const [filteredData, setFilteredData] = useState<(ListingsStatusType | null)[]>([]);
  const [origData, setOrigData] = useState<ListingsStatusType[]>([]);
  const [searchIndex, setSearchIndex] = useState<{ allValues: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const crawl = (record: ListingsStatusType, allValues?: string[]) => {
      if (!allValues) allValues = [];
      for (const key in record) {
        if (typeof record[key as keyof KeyType] === 'object') crawl(record[key as keyof KeyType], allValues);
        else allValues.push(record[key as keyof KeyType] + ' ');
      }
      return allValues;
    };
    const fetchData = async () => {
      setOrigData(dataSource());
      setFilteredData(dataSource());
      const searchInd = dataSource().map((record: ListingsStatusType) => {
        const allValues = crawl(record);
        return {
          allValues: allValues.toString()
        };
      });
      setSearchIndex(searchInd);
      if (dataSource()) setLoading(false);
    };
    fetchData();
  }, [dataSource]);

  useEffect(() => {
    if (searchTxt) {
      const reqData = searchIndex.map((record, index) => {
        if (record.allValues.toLowerCase().indexOf(searchTxt.toLowerCase()) >= 0) {
          return origData[index];
        }
        return null;
      });
      setFilteredData(
        reqData.filter((record) => {
          if (record) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchTxt, origData, searchIndex]);

  return { filteredData, loading };
};
