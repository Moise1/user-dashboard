// import { AsyncThunk } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';

type KeyType = string | number | null | undefined;

export const useTableSearch = <T>(searchTxt: string | null, dataSource : () => T[]) => {
  const [filteredData, setFilteredData] = useState<(T | null)[]>([]);
  const [origData, setOrigData] = useState<T[]>([]);
  const [searchIndex, setSearchIndex] = useState<{ allValues: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const crawl = (record: T, allValues?: string[]) => {
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
      const searchInd = dataSource().map((record: T) => {
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

    // these needs to be finished later... don't remove it

    //if (tabStatus === 'activeTab') {
    //  const [list, setList] = useState<number[]>([]);
    //  filteredData.map(item => {
    //    if (item?.channelListingId)
    //      setList(old => [...old, item?.channelListingId]);
    //  });
    //  if (list.length > 0) {
    //    // load the images here
    //    console.log(list);
    //  }
    //}
  }, [searchTxt, origData, searchIndex]);

  return { filteredData, loading };
};
