import { createSlice } from '@reduxjs/toolkit';
import { getCatalogProducts,getCatalogProductsSearching } from './catalogThunk';

export interface CatalogProduct {
  id: number;
  sourceId: number;
  imageUrl: string;
  sourcePrice: number;
  title: string;
  url: string;
  profit: number;
  channelPrice: number;
  options: number;
  competition: number;
  sold: number;
  priority: number;
  quantityListed: number;
  [key: string]: number | string | boolean | null;
  page: number;
  totalResults: number;
  pageSize: number;
  sessionId: number;
  option: number;
  productId:number;
}


export interface selectedProductDetailData
{
  channelPrice?: number;
  competition?: number;
  id?: number;
  imageUrl: string;
  options: number;
  priority: number;
  profit: number;
  quantityListed: number;
  sold: number;
  sourceId: number;
  sourcePrice: number;
  title: string;
  url: string;
}

const initialState = {
  catalogProducts: [] as CatalogProduct[],
  loading: false,
  error: ''
};


const searchInitialState = {
  catalogSearchedProducts: [] as CatalogProduct[],
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

export const catalogSearchSlice = createSlice({
  name: 'catalogSearch',
  initialState: searchInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogProductsSearching.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(getCatalogProductsSearching.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.catalogSearchedProducts = payload;
    });
    builder.addCase(getCatalogProductsSearching.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = String(payload);
    });
  }
});

export const { reducer: catalogProductsReducer } = catalogSlice;
export const {reducer: catalogSearchProductReducer} = catalogSearchSlice;
