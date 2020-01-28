import {createAction, props} from '@ngrx/store';
import {Meme} from "../models";

export const loadMemes = createAction(
    '[Memes] Load Memes'
);

export const saveMemes = createAction(
    '[Memes] Save Memes',
    props<{ memes: Meme[] }>()
);

export const saveNextPageUrl = createAction(
    '[Memes] Save Next Page Url',
    props<{ nextPageUrl: string }>()
);

export const saveMemesMetadata = createAction(
    '[Memes] Save Memes Metadata',
    props<{ memes: Meme[], nextPageUrl: string}>()
);

export const setCurrentMeme = createAction(
    '[Memes] Set Current Meme',
    props<{ meme: Meme }>()
);
