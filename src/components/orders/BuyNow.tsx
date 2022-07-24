import { useEffect } from 'react';

export const BuyNow = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const sourceUrl = params.get('sourceUrl');

  useEffect(() => {
    window.location.assign(sourceUrl as unknown as string);
  }, []);

  return <p>you are being redirect to: {sourceUrl}</p>;
};
