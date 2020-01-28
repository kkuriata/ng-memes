import {ErrorHandler, Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(@Inject(DOCUMENT) private document: Document) {
    }
    
    handleError(error) {
        setTimeout(() => {
            console.error(error);
            this.document.defaultView.location.reload()
        }, 10000);
    }
}
