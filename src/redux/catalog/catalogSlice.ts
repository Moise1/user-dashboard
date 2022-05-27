import { createSlice } from '@reduxjs/toolkit';
import { getCatalogProducts } from './catalogThunk';

export interface CatalogProduct {
  id: number;
  sourceId: number;
  imageUrl: null;
  sourcePrice: null;
  title: null;
  url: null;
  profit: null;
  channelPrice: null;
  options: number;
  competition: number;
  sold: number;
  priority: number;
  quantityListed: number;
  [key: string]: number | string | boolean | null;
}

const initialState = {
  catalogProducts: [] as CatalogProduct[],
  loading: false,
  error: ''
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogProducts.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getCatalogProducts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.catalogProducts = payload;
    });
    builder.addCase(getCatalogProducts.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: catalogProductsReducer } = catalogSlice;
