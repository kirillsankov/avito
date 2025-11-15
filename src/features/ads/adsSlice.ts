import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AdsState } from '../../types/ads';
import type { Ad } from '../../types/apiType';

const initialState: AdsState = {
    ads: [],
    activeAdId: null,
};

export const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
        setAds: (state, action: PayloadAction<Ad[]>) => {
            state.ads = action.payload;
        },
        setActiveAdId: (state, action: PayloadAction<number | null>) => {
            state.activeAdId = action.payload;
        },
    },
});

export const { setAds, setActiveAdId } = adsSlice.actions;

export default adsSlice.reducer;

