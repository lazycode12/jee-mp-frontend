import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { NgClass } from '@angular/common';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-gestion-personnes',
  imports: [SideBarComponent, NavBarComponent, NgClass, FormsModule, Dialog, ButtonModule, ReactiveFormsModule, TagModule],
  templateUrl: './gestion-comptes.component.html'
})
export class GestionComptesComponent {
  sidebarItems: any = [];
  isOpen: boolean = true;
  visible: boolean = false;

  // show popup
  edit() {
    this.visible = true;
  }

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-user")
  }

  fg = new FormGroup({
    nom : new FormControl(""),
    prenom : new FormControl(""),
    cin : new FormControl(""),
    email : new FormControl(""),
    tele : new FormControl("")

  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.fg.value);
  }
}
