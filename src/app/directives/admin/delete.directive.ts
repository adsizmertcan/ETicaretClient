import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService
  ) {
    const i = _renderer.createElement('img');
    i.setAttribute('class', 'fa-solid fa-trash');
    i.setAttribute('style', 'cursor:pointer;');
    i.width = 25;
    i.height = 25;
    _renderer.appendChild(element.nativeElement, i);
  }

  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onclick() {
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(2000, () => {
      this.callback.emit();
    });
  }
}
