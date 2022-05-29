import { useState, useEffect } from 'react';
import { ActiveListing } from 'src/redux/unmap';

interface Props {
  searchTxt: string | null;
  listings: ActiveListing[];
}

type KeyType = string | number | null | undefined | ActiveListing;

export const useTableSearch = ({ searchTxt, listings }: Props) => {
  const [filteredData, setFilteredData] = useState<(ActiveListing | null)[]>([]);
  const [origData, setOrigData] = useState<ActiveListing[]>([]);
  const [searchIndex, setSearchIndex] = useState<{ allValues: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const crawl = (record: ActiveListing, allValues?: string[]) => {
      if (!allValues) allValues = [];
      for (const key in record) {
        if (typeof record[key as keyof KeyType] === 'object') crawl(record[key as keyof KeyType], allValues);
        else allValues.push(record[key as keyof KeyType] + ' ');
      }
      return allValues;
    };
    const fetchData = async () => {
      setOrigData(listings);
      setFilteredData(listings);
      const searchInd = listings.map((record: ActiveListing) => {
        const allValues = crawl(record);
        return {
          allValues: allValues.toString()
        };
      });
      setSearchIndex(searchInd);
      if (listings) setLoading(false);
    };
    fetchData();
  }, [listings]);

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
