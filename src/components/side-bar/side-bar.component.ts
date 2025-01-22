import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-side-bar',
    imports: [NgClass, RouterLink, RouterLinkActive, NgFor],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  @Input() isOpen: boolean = false;
  @Input() items: { label: string, link: string, icon: string}[] | undefined;



  // extract sidebar elements

}
