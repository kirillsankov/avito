import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AdsState } from '../../types/ads';
import type { Ad } from '../../types/apiType';

const initialState: AdsState = {
    ads: [],
    activeAdId: null,
    selectionMode: false,
    selectedAdIds: [],
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
        setSelectionMode: (state, action: PayloadAction<boolean>) => {
            state.selectionMode = action.payload;
            if (!action.payload) {
                state.selectedAdIds = [];
            }
        },
        toggleAdSelection: (state, action: PayloadAction<number>) => {
            const index = state.selectedAdIds.indexOf(action.payload);
            if (index === -1) {
                state.selectedAdIds.push(action.payload);
            } else {
                state.selectedAdIds.splice(index, 1);
            }
        },
        selectAllAds: (state) => {
            const currentPageAdIds = state.ads.map(ad => ad.id);
            const newSelectedIds = [...new Set([...state.selectedAdIds, ...currentPageAdIds])];
            state.selectedAdIds = newSelectedIds;
        },
        deselectAllAds: (state) => {
            state.selectedAdIds = [];
        },
        removeSelectedAds: (state) => {
            state.ads = state.ads.filter(ad => !state.selectedAdIds.includes(ad.id));
            state.selectedAdIds = [];
        },
    },
});

export const { 
    setAds, 
    setActiveAdId, 
    setSelectionMode, 
    toggleAdSelection, 
    selectAllAds, 
    deselectAllAds,
    removeSelectedAds,
} = adsSlice.actions;

export default adsSlice.reducer;

