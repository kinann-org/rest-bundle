import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'index-link',
    template: `<!--bq-->
    <div>
        <h1>RestBundle  index-{{index}}.html</h1>
        This the RestBundle home page for the /REST_BUNDLE REST service.
        <ul>
            <li><a href="index-jit">/{{rest}}/ui/index-jit</a> uses JIT (runtime) compiled Angular components 
            <li><a href="index-aot">/{{rest}}/ui/index-aot</a> uses AOT pre-compiled Angular components 
            <li><a href="index-dist">/{{rest}}/ui/index-dist</a> uses WebPack-ed AOT compiled Angular components
        </ul>
    </div>
    <!--bq-->`,
    styleUrls: ['./rest-bundle.module.css'],
})
export class IndexLinkComponent  { 
    rest = '?name?';
    index = '?index?';
    constructor(eref:ElementRef) {
        this.index = eref.nativeElement.getAttribute("index") || "expected attribute:index";
        this.rest = eref.nativeElement.getAttribute("rest") || "expected attribute:rest";
    }
}
