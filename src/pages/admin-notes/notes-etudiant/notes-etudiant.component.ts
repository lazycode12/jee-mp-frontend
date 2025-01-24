import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { NgClass } from '@angular/common';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-notes-etudiant',
  imports: [SideBarComponent, NavBarComponent, NgClass, FormsModule, CheckboxModule, ButtonModule],
  templateUrl: './notes-etudiant.component.html',
  styles: ``
})
export class NotesEtudiantComponent {

  sidebarItems: any = [];
  isOpen: boolean = true;
  cne: string = "";
  anne_etude: string = "";
  module: string = "";
  checked: boolean = false;

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-notes")
  }

  checkedf(){
    console.log(this.checked)
  }
}
