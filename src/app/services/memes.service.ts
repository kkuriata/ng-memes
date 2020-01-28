import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MemeResponse} from "../models";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MemesService {
    constructor(private http: HttpClient) {
    }
    
    getMemes(nextPageUrl?: string): Observable<MemeResponse> {
        const urlPart: string = nextPageUrl ? nextPageUrl : '/9gag';
        const url: string = `${environment.api}${urlPart}`;
        
        return this.http.get(url) as Observable<MemeResponse>;
    }
}
