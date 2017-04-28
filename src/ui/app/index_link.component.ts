import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'index-link',
    template: `<!--bq-->
    <div>
        <h1>RestBundle  index-{{name}}.html</h1>
        This the RestBundle home page for the /REST_BUNDLE REST service.
        <ul>
            <li><a href="index-jit.html">index-jit.html</a> uses JIT (runtime) compiled Angular components 
            <li><a href="index-aot.html">index-aot.html</a> uses AOT pre-compiled Angular components 
            <li><a href="index-dist.html">index-dist.html</a> uses WebPack-ed AOT compiled Angular components
        </ul>
    </div>
    <!--bq-->`,
    styleUrls: ['./rest_bundle.module.css'],
})
export class IndexLinkComponent  { 
    name = '?name?';
    constructor(eref:ElementRef) {
        this.name = eref.nativeElement.getAttribute("name") || "NONAME";
    }
}
