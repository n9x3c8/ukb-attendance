import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appWarning]'
})
export class WarningDirective implements AfterViewInit {
  private toggle: boolean = true;
  @Input() appWarning: boolean;

  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.borderBottom') borderBottom: string;
  @HostBinding('style.borderBottomLeftRadius') borderBottomLeftRadius: string;
  @HostBinding('style.borderBottomRightRadius') borderBottomRightRadius: string;

  constructor(private _el: ElementRef<HTMLElement>, private _render: Renderer2) { }

  @HostListener('click') onClick() {
    if (!this.appWarning) {
      return;
    }
    
    this.toggle = !this.toggle;

    const itemContent = this._el.nativeElement.querySelector('.item2-content');
    
    if (this.toggle && this.appWarning) {
      this._render.setStyle(this._el.nativeElement, 'height', 'auto');
      this._render.setStyle(itemContent, 'display', 'none');
      return;
    }
    this._render.setStyle(itemContent, 'display', 'block');
    this._render.setStyle(itemContent, 'animation', 'animation-display');
    this._render.setStyle(itemContent, 'animation-duration', '.8s');

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initStyleWarning();
    }, 0);
  }

  private initStyleWarning() {
    if (this.appWarning) {
      this.backgroundColor = '#FFEFDE';
      this.borderBottom = '1px solid rgba(245, 124, 0, 80%)';
      this.borderBottomLeftRadius = '0';
      this.borderBottomRightRadius = '0';
      let itemContent = this._el.nativeElement.querySelector('.item2-content');
      this._render.setStyle(itemContent, 'display', 'none');
      this._render.setStyle(this._el.nativeElement, 'height', 'auto');
      return;
    }
  }

}
