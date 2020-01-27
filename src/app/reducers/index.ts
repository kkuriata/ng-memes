import {ActionReducerMap, MetaReducer} from '@ngrx/store';

import {environment} from '../../environments/environment';
import * as fromMemes from './memes.reducer';
import {MemesState} from './memes.reducer';

export interface State {
    memes: MemesState
}

export const reducers: ActionReducerMap<State> = {
    memes: fromMemes.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
