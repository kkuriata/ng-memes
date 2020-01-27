import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MemesService} from "../../services/memes.service";
import {ContentTypes, Meme} from "../../models";
import {from, Observable, of, Subject} from "rxjs";
import {select, Store} from "@ngrx/store";
import {MemesState} from "../../reducers/memes.reducer";
import {loadMemes} from "../../actions/memes.actions";
import {selectSavedMemes} from "../../selectors/memes.selectors";
import {concatMap, delay, mergeMap, take, takeUntil, timeInterval} from "rxjs/operators";

@Component({
    selector: 'app-memes',
    templateUrl: './memes.component.html',
    styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {
    @ViewChild('imageTemplate') imageTemplateRef: TemplateRef<HTMLElement>;
    @ViewChild('videoTemplate') videoTemplateRef: TemplateRef<HTMLElement>;
    
    @ViewChild('image') imageRef: ElementRef<HTMLImageElement>;
    @ViewChild('video') videoRef: ElementRef<HTMLVideoElement>;
    
    ngUnsubscribe$: Subject<void> = new Subject<void>();
    savedMemes$: Observable<Meme>;
    
    isImage: boolean;
    duration: number;
    imageDuration = 3*1000;
    
    constructor(private memesService: MemesService, private store: Store<MemesState>) {
    }
    
    ngOnInit() {
        this.savedMemes$ = this.store.pipe(
            takeUntil(this.ngUnsubscribe$),
            select(selectSavedMemes),
            mergeMap((x: Meme[]) => from(x)),
            concatMap((meme: Meme, index: number) => {
                const meme$ = of(meme);
                
                return index === 0 ? meme$ : meme$.pipe(delay(this.imageDuration));
            })
        );
        
        this.store.dispatch(loadMemes({}));
    }
    
    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
    
    setElementRef(meme: Meme): TemplateRef<HTMLElement> {
        this.isImage = meme.content.contentType === ContentTypes.image;
        
        return this.isImage ? this.imageTemplateRef : this.videoTemplateRef;
    }
    
    setDuration(event): void {
        this.duration = Math.ceil(this.videoRef.nativeElement.duration * 2);
    }
}
