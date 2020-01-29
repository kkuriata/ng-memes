import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesService} from "../../services/memes.service";
import {Meme} from "../../models";
import {from, Observable, of, Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {MemesState} from "../../reducers/memes.reducer";
import {loadMemes, setCurrentMeme} from "../../actions/memes.actions";
import {selectCurrentMeme, selectNextPageUrl, selectSavedMemes} from "../../selectors/memes.selectors";
import {concatMap, delay, mergeMap, skip, takeUntil, filter} from "rxjs/operators";

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
    
    imageDuration = 60 * 1000;
    dummyMeme: Meme = {
        content: undefined,
        title: undefined
    };
    
    constructor(
        private memesService: MemesService,
        private store: Store<MemesState>
        ) {
    }
    
    ngOnInit() {
        this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(selectSavedMemes),
            filter((meme: Meme[]) => meme.length > 0),
            mergeMap((meme: Meme[]) => from([...meme, this.dummyMeme])),
            concatMap((meme: Meme, index: number) => {
                const meme$ = of(meme);
                console.log('index', index);
                
                return index === 0 ? meme$ : meme$.pipe(delay(this.imageDuration));
            })
        ).subscribe((meme: Meme) => {
            console.log('meme', meme);
            if (!meme.content) {
                this.store.dispatch(loadMemes());
                return;
            }
            
            return this.store.dispatch(setCurrentMeme({meme}));
        });
        
        this.currentMeme$ = this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(selectCurrentMeme)
        );
        
        this.nextPageUrl$ = this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(selectNextPageUrl)
        );
        
        this.store.dispatch(loadMemes());
    }
    
    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
