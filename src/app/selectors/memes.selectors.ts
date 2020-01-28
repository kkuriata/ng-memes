import {createFeatureSelector, createSelector} from '@ngrx/store';
import {memesFeatureKey, MemesState} from "../reducers/memes.reducer";

export const memesStateSelector = createFeatureSelector<MemesState>(memesFeatureKey);

export const selectCurrentMeme = createSelector(
    memesStateSelector,
    (state) => state.currentMeme
);

export const selectSavedMemes = createSelector(
    memesStateSelector,
    (state) => state.memes
);

export const selectCurrentPageUrl = createSelector(
    memesStateSelector,
    (state) => state.currentPageUrl
);
