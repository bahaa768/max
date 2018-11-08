import { Component } from '@angular/core';


@Component({
  selector: 'app-manage-dropdown',
  templateUrl: './manage-dropdown.component.html'
})
export class ManageDropdownComponent {

  items: object[] = [
    {name: 'link A', value: '' },
    {name: 'link B', value: ''}
  ];

  onHidden(): void {
    console.log('Dropdown is hidden');
  }
  onShown(): void {
    console.log('Dropdown is shown');
  }
  isOpenChange(): void {
    console.log('Dropdown state is changed');
  }

}
