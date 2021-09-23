import { Directive, OnInit, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appAmount]'
})
export class AmountDirective implements OnInit {
  @Input() appAmount: number = 0;

  constructor(private element: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
    if (this.appAmount < 5) { this.renderer.setStyle(this.element.nativeElement.getElementsByClassName('amount')[0], 'color', 'red'); }
    if (this.appAmount >= 5 && this.appAmount <= 19) { this.renderer.setStyle(this.element.nativeElement.getElementsByClassName('amount')[0], 'color', 'yellow'); }
    if (this.appAmount >= 20) { this.renderer.setStyle(this.element.nativeElement.getElementsByClassName('amount')[0], 'color', 'green'); }

  }

}
