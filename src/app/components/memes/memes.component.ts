import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MemesService} from "../../services/memes.service";
import {ContentTypes, Meme, MemeResponse} from "../../models";
import {from, of, Subject} from "rxjs";
import {concatMap, delay, map, mergeMap, takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-memes',
    templateUrl: './memes.component.html',
    styleUrls: ['./memes.component.scss']
})
export class MemesComponent implements OnInit, OnDestroy {
    @ViewChild('image') imageRef: ElementRef<HTMLImageElement>;
    @ViewChild('video') videoRef: ElementRef<HTMLVideoElement>;

    ngUnsubscribe$: Subject<void> = new Subject<void>();

    memes: Meme[] = [];
    currentMeme: Meme;

    constructor(private memesService: MemesService) {
    }

    ngOnInit() {
        this.memesService.getMemes().pipe(
            takeUntil(this.ngUnsubscribe$),
            map((res: MemeResponse) => {
                return res.memes;
            }),
            mergeMap(x => from(x)),
            concatMap(x => of(x).pipe(
                delay(3000)
            ))
        ).subscribe((meme) => {
            console.log(meme);
        });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    getElementRef(meme: Meme): ElementRef<HTMLElement> {
        return meme.content.contentType === ContentTypes.image ? this.imageRef : this.videoRef;
    }
}
