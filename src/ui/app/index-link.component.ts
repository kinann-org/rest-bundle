import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'index-link',
    styles: [`
        h1 {
            font-size: 120%;
            font-weight: 700;
            color: #339;
        }
    `],
    template: `<!--bq-->
    <div>
        <h1>/{{service}}/ui/index-{{index}}</h1>
        This is the home page for the "{{service}}" REST service.
        The home page is available in different configurations:

        <ul>
            <li><a href="index-jit">JIT Development</a> uses JIT (runtime) compiled Angular components 
            <li><a href="index-aot">AOT Development</a> uses AOT pre-compiled Angular components 
            <li><a href="index-dist">Production</a> uses WebPack-ed AOT pre-compiled Angular components
        </ul>

        Each RestBundle provides a REST service along with one or more Angular user interface components.
        Here we show the <code>&lt;rest-bundle-identity&gt;</code> Angular component which displays the information returned
        by the <code>/{{service}}/identity</code> REST GET method.
    </div>
    <!--bq-->`,
})
export class IndexLinkComponent  { 
    service = '?service?';
    index = '?index?';
    constructor(eref:ElementRef) {
        this.index = eref.nativeElement.getAttribute("index") || "expected attribute:index";
        this.service = eref.nativeElement.getAttribute("service") || "expected attribute:service";
    }
}
