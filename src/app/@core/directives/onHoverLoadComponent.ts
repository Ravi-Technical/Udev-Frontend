import { ApplicationRef, ComponentRef, Directive, HostListener, Injector, Input, Type, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[loadComponent]',
    standalone: true
})

export class onHoverLoadComponentDirective {
    @Input('loadComponent') component!: Type<any>;
    private comRef?: ComponentRef<any>;

    constructor(private vcr: ViewContainerRef) { }

    @HostListener('mouseenter')
    onMouseEnter() {

        if (!this.comRef) {
           this.comRef = this.vcr.createComponent(this.component);
           console.log(this.comRef);
        }
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        if (this.comRef) {
            this.comRef.destroy();
            this.comRef = undefined;
        }
    }

}