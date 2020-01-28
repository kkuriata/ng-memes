import {ActionReducerMap, MetaReducer} from '@ngrx/store';

import {environment} from '../../environments/environment';
import * as fromMemes from './memes.reducer';
import {memesFeatureKey, MemesState} from './memes.reducer';

export interface State {
    [memesFeatureKey]: MemesState
}

export const reducers: ActionReducerMap<State> = {
    [memesFeatureKey]: fromMemes.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
