import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatMap, map, switchMap, withLatestFrom} from "rxjs/operators";

import {ContentTypes, MemeResponse} from "./models";
import {MemesService} from "./services/memes.service";
import {loadMemes, saveNextPageUrl, saveMemes, saveMemesMetadata} from "./actions/memes.actions";
import {of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectNextPageUrl} from './selectors/memes.selectors';
import {MemesState} from './reducers/memes.reducer';

@Injectable()
export class AppEffects {
    loadMemes$ = createEffect(() => this.actions$.pipe(
        ofType(loadMemes),
        withLatestFrom(this.store$.select(selectNextPageUrl)),
        switchMap(([, nextPageUrl]) => {
            return this.memesService.getMemes(nextPageUrl);
        }),
        map((response: MemeResponse) => {
            const imageMemes = response.memes.filter((meme) => meme.content.contentType === ContentTypes.image);

            return saveMemesMetadata({
                memes: imageMemes,
                nextPageUrl: response.next_page_url
            })
        })
    ));
    
    saveMemes$ = createEffect(() => this.actions$.pipe(
        ofType(saveMemesMetadata),
        concatMap((metadata) => of(saveMemes({ memes: metadata.memes })))
    ));
    
    saveCurrentPageUrl$ = createEffect(() => this.actions$.pipe(
        ofType(saveMemesMetadata),
        concatMap((metadata) => of(saveNextPageUrl({ nextPageUrl: metadata.nextPageUrl })))
    ));
    
    constructor(private actions$: Actions, private store$: Store<MemesState>, private memesService: MemesService) {
    }
}
