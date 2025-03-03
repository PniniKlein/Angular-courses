import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective implements OnChanges{
  @Input() tooltip: string;
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnChanges() {
    this.renderer.setAttribute(this.el.nativeElement, 'title', this.tooltip);
  }
}