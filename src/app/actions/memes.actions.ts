import {createAction, props} from '@ngrx/store';
import {Meme} from "../models";

export const loadMemes = createAction(
    '[Memes] Load Memes',
    props<{ nextPageUrl?: string }>()
);

export const saveMemes = createAction(
    '[Memes] Save Memes',
    props<{ memes: Meme[] }>()
);

export const saveCurrentPageUrl = createAction(
    '[Memes] Save Current Page Url',
    props<{ currentPageUrl: string }>()
);

export const saveMemesMetadata = createAction(
    '[Memes] Save Memes Metadata',
    props<{ memes: Meme[], currentPageUrl: string}>()
);

export const setCurrentMeme = createAction(
    '[Memes] Set Current Meme',
    props<{ meme: Meme }>()
);
