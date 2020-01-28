import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map, switchMap} from "rxjs/operators";

import {ContentTypes, MemeResponse} from "./models";
import {MemesService} from "./services/memes.service";
import {loadMemes, saveCurrentPageUrl, saveMemes, saveMemesMetadata} from "./actions/memes.actions";
import {of} from 'rxjs';

@Injectable()
export class AppEffects {
    loadMemes$ = createEffect(() => this.actions$.pipe(
        ofType(loadMemes),
        switchMap(({nextPageUrl}) => {
            return this.memesService.getMemes(nextPageUrl);
        }),
        map((response: MemeResponse) => {
            const imageMemes = response.memes.filter((meme) => meme.content.contentType === ContentTypes.image);

            return saveMemesMetadata({
                memes: imageMemes,
                currentPageUrl: response.next_page_url
            })
        })
    ));
    
    saveMemes$ = createEffect(() => this.actions$.pipe(
        ofType(saveMemesMetadata),
        concatMap((metadata) => of(saveMemes({ memes: metadata.memes })))
    ));
    
    saveCurrentPageUrl$ = createEffect(() => this.actions$.pipe(
        ofType(saveMemesMetadata),
        concatMap((metadata) => of(saveCurrentPageUrl({ currentPageUrl: metadata.currentPageUrl })))
    ));
    
    constructor(private actions$: Actions, private memesService: MemesService) {
    }
}
