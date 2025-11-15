import type { RootState } from '../../types/store';
import type { Ad } from '../../types/apiType';

export const selectAds = (state: RootState): Ad[] => state.ads.ads;
export const selectActiveAdId = (state: RootState): number | null => state.ads.activeAdId;

export const selectActiveAd = (state: RootState): Ad | undefined => {
    const { ads, activeAdId } = state.ads;
    if (activeAdId === null) return undefined;
    return ads.find((ad) => ad.id === activeAdId);
};

