import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-importer-sp',
  standalone: true,
  imports: [NgClass, NavBarComponent, SideBarComponent],
  templateUrl: './importer-sp.component.html',
  styleUrl: './importer-sp.component.css'
})
export class ImporterSPComponent {

  isOpen:boolean = true;
  isSubmitted:boolean = false;
  sidebarItems: any = [];

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-sp")
  }
}
