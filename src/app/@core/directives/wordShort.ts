import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[wordShort]',
    standalone: true
})
export class WordShortDirective implements AfterViewInit, OnChanges {

    @Input('wordShort') wordLimit: number = 20;
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['wordLimit']) {
            this.shortenWord();
        }
    }
    ngAfterViewInit(): void { 
        this.shortenWord();
    }

    private shortenWord() {
        const fullText: string = this.el.nativeElement.innerText;
        const word = fullText.split('/\s+/');
        const truncateText = fullText.slice(0, this.wordLimit);
        if (fullText.length > this.wordLimit) {
            this.renderer.setProperty(this.el.nativeElement, 'innerText', truncateText + '...');
        }
    }


}