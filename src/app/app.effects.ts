import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, switchMap} from "rxjs/operators";

import {MemeResponse} from "./models";
import {MemesService} from "./services/memes.service";
import {loadMemes, saveMemes} from "./actions/memes.actions";

@Injectable()
export class AppEffects {
    loadMemes$ = createEffect(() => this.actions$.pipe(
        ofType(loadMemes),
        switchMap(({nextPageUrl}) => {
            return this.memesService.getMemes(nextPageUrl);
        }),
        map((response: MemeResponse) => {
            return saveMemes({memes: response.memes});
        })
    ));
    
    constructor(private actions$: Actions, private memesService: MemesService) {
    }
}
