import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class RestBundleService {
    name = "";
    constructor(private http:Http) {
        this.name = "(loading...)";
    }
}
