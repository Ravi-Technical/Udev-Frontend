import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[statusHilight]'
})

export class StatusHilightDirective implements OnChanges {
    @Input() statusHilight!: boolean;

    constructor(private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        this.applyColor();
    }

    private applyColor() {
        if (this.statusHilight === true) {
            this.el.nativeElement.style.backgroundColor = 'lightgreen';
            this.el.nativeElement.style.color = 'black';
        } else {
            this.el.nativeElement.style.backgroundColor = 'red';
            this.el.nativeElement.style.color = 'white';
        }
    }

    //  @HostListener('mouseenter') onMouseEnter(){
    //      this.highlight(this.statusHilight || 'yellow');
    //  }

    //  @HostListener('mouseleave') onMouseLeave(){
    //      this.highlight('');
    //  }

    //  private highlight(color:string){
    //    this.el.nativeElement.style.backgroundColor = color;
    //    //this.el.nativeElement.style.color = 'white';
    //  }


}