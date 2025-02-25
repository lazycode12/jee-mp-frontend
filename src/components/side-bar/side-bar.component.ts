import { NgClass, NgFor } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-side-bar',
    imports: [NgClass, RouterLink, RouterLinkActive, NgFor],
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  @Input() isOpen: boolean = false;
  @Input() items: { label: string, link: string, icon: string}[] | undefined;

  //services
  authService: AuthService = inject(AuthService);

  logout(): void{
    this.authService.logout();
  }

}
