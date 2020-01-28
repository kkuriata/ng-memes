import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MemesService} from "../../services/memes.service";
import {ContentTypes, Meme} from "../../models";
import {forkJoin, from, Observable, of, Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {MemesState} from "../../reducers/memes.reducer";
import {loadMemes, setCurrentMeme} from "../../actions/memes.actions";
import {selectCurrentMeme, selectCurrentPageUrl, selectSavedMemes} from "../../selectors/memes.selectors";
import {concatMap, delay, finalize, map, mergeMap, takeUntil, withLatestFrom} from "rxjs/operators";

@Component({
    selector: 'app-memes',
    templateUrl: './memes.component.html',
    styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {
    @ViewChild('image') imageRef: ElementRef<HTMLImageElement>;
    
    ngUnsubscribe$: Subject<void> = new Subject<void>();
    currentMeme$: Observable<Meme>;
    nextPageUrl$: Observable<string>;
    
    imageDuration = 3*1000;
    
    constructor(private memesService: MemesService, private store: Store<MemesState>) {
    }
    
    ngOnInit() {
        this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(selectSavedMemes),
            mergeMap((meme: Meme[]) => from(meme)),
            concatMap((meme: Meme, index: number) => {
                const meme$ = of(meme);
                
                return index === 0 ? meme$ : meme$.pipe(delay(this.imageDuration));
            })
        ).subscribe((meme: Meme) => this.store.dispatch(setCurrentMeme({ meme })));
        
        this.currentMeme$ = this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(selectCurrentMeme)
        );
        
        this.nextPageUrl$ = this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(selectCurrentPageUrl)
        );
        
        this.store.dispatch(loadMemes({}));
    }
    
    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
