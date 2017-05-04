import { ElementRef, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export declare class RestBundleIdentityComponent implements AfterViewInit {
    http: Http;
    service: string;
    description: string;
    name: string;
    date: Date;
    package: string;
    version: string;
    constructor(eref: ElementRef, http: Http);
    ngAfterViewInit(): void;
}
