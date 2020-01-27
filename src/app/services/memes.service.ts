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

    getMemes(): Observable<MemeResponse> {
        return this.http.get(`${environment.api}/9gag`) as any;
    }
}
