import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  @HostBinding('class.open') state = false;
  @HostListener('click') onToggle() {
    this.state = !this.state;
    }
  }




