import type { Ad } from './apiType';

export interface AdsState {
    ads: Ad[];
    activeAdId: number | null;
    selectionMode: boolean;
    selectedAdIds: number[];
}

