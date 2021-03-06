import {Action, createReducer, on} from '@ngrx/store';
import {Meme} from "../models";
import {saveNextPageUrl, saveMemes, setCurrentMeme} from "../actions/memes.actions";

export const memesFeatureKey = 'memes';

export interface MemesState {
    memes: Meme[],
    currentMeme: Meme,
    nextPageUrl: string
}

export const initialState: MemesState = {
    memes: [],
    currentMeme: undefined,
    nextPageUrl: ''
};

const memesReducer = createReducer(
    initialState,
    on(saveNextPageUrl, ((state, {nextPageUrl}) => {
        return {
            ...state,
            nextPageUrl
        };
    })),
    on(saveMemes, ((state, {memes}) => {
        return {
            ...state,
            memes
        };
    })),
    on(setCurrentMeme, ((state, {meme}) => {
        return {
            ...state,
            currentMeme: meme
        };
    }))
);

export function reducer(state: MemesState | undefined, action: Action) {
    return memesReducer(state, action);
}
