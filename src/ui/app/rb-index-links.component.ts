import { Component, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'rb-index-links',
    styles: [`
    `],//styles
    template:`
        <div classs='rb-index-links'>
            <h1>/{{service}}/ui/index-{{index}}</h1>
            This is the home page for the "{{service}}" REST service.
            The home page is available in different configurations:

            <ul>
                <li><a href="index-jit">JIT Development</a> uses JIT (runtime) compiled Angular components 
                <li><a href="index-aot">AOT Development</a> uses AOT pre-compiled Angular components 
                <li><a href="index-dist">Production</a> uses WebPack-ed AOT pre-compiled Angular components
            </ul>

            Each RestBundle instance provides a named Node.js REST service bound with matching Angular Components.
            For example, below is a service component that displays identity information returned
            by the "{{service}}" REST service:
        </div>
    `,//template
})
export class RbIndexLinks  { 
    service = '?service?';
    index = '?index?';
    constructor(eref:ElementRef) {
        this.index = eref.nativeElement.getAttribute("index") || "expected attribute:index";
        this.service = eref.nativeElement.getAttribute("service") || "expected attribute:service";
    }
}
