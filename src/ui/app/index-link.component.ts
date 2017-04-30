import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'index-link',
    template: `<!--bq-->
    <div>
        <h1>RestBundle  index-{{index}}.html</h1>
        This is the RestBundle home page for the /{{service}} REST service.
        <ul>
            <li><a href="index-jit">/{{service}}/ui/index-jit</a> uses JIT (runtime) compiled Angular components 
            <li><a href="index-aot">/{{service}}/ui/index-aot</a> uses AOT pre-compiled Angular components 
            <li><a href="index-dist">/{{service}}/ui/index-dist</a> uses WebPack-ed AOT pre-compiled Angular components
        </ul>
        Each RestBundle provides a REST service along with one or more Angular user interface components.
        Here we show the &lt;rest-bundle-ui&gt; Angular component which displays the information returned
        by the /identity REST GET method of the /{{service}} service.
    </div>
    <!--bq-->`,
    styleUrls: ['./rest-bundle.module.css'],
})
export class IndexLinkComponent  { 
    service = '?service?';
    index = '?index?';
    constructor(eref:ElementRef) {
        this.index = eref.nativeElement.getAttribute("index") || "expected attribute:index";
        this.service = eref.nativeElement.getAttribute("service") || "expected attribute:service";
    }
}
