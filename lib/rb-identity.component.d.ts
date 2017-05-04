import { ElementRef, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export declare class RbIdentity implements AfterViewInit {
    http: Http;
    static instances: number;
    service: string;
    instance: number;
    name: string;
    package: string;
    version: string;
    constructor(eref: ElementRef, http: Http);
    ngAfterViewInit(): void;
}
