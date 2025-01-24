import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-gestion-etudiants',
  imports: [SideBarComponent, NavBarComponent, NgClass, ButtonModule],
  templateUrl: './gestion-etudiants.component.html',
  styles: ``
})
export class GestionEtudiantsComponent {

    sidebarItems: any = [];
    isOpen: boolean = true;

    // services
    sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

    //ngOnInit function
    ngOnInit(){
        this.sidebarItems = this.sideBarService.getSideBarData("admin-notes")
    }
}
