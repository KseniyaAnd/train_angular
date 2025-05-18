import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSearchHighlight]'
})
export class SearchHighlightDirective implements OnChanges {
  @Input('appSearchHighlight') searchTerm: string = '';
  @Input() label: string = '';
  @Input() disabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    const term = this.searchTerm?.trim().toLowerCase();
    const labelText = this.label?.trim().toLowerCase();

    const hasSearch = term?.length > 0;
    const matches = hasSearch && labelText.includes(term);

    if (matches) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#d2f8d2'); // зелёный
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    } else if (hasSearch) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#f0f0f0'); // блеклый
      this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    } else {
      this.resetStyles();
    }
  }

  private resetStyles(): void {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color');
    this.renderer.removeStyle(this.el.nativeElement, 'pointer-events');
    this.renderer.removeStyle(this.el.nativeElement, 'opacity');
  }
}
