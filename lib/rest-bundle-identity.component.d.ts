import { ElementRef, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export declare class RestBundleIdentityComponent implements OnInit {
    http: Http;
    name: string;
    date: Date;
    package: string;
    version: string;
    service: string;
    description: string;
    constructor(eref: ElementRef, http: Http);
    ngOnInit(): void;
}
