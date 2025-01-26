import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { NgClass } from '@angular/common';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gestion-personnes',
  imports: [ConfirmDialog,ToastModule,SideBarComponent, NavBarComponent, NgClass, FormsModule, Dialog, ButtonModule, ReactiveFormsModule, TagModule],
  templateUrl: './gestion-comptes.component.html',
  providers: [MessageService, ConfirmationService]
})
export class GestionComptesComponent {

  sidebarItems: any = [];
  isOpen: boolean = true;
  visible_view: boolean = false;
  visible_edit: boolean = false;

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-user")
  }

  fg = new FormGroup({
    role : new FormControl(""),
    login: new FormControl(""),
    password : new FormControl(""),
    active : new FormControl(""),
    locked : new FormControl("")

  })

  showEditDialog(){
    this.visible_edit = true;
  }

  showCompte(){
    this.visible_view = true;
  }

  edit(e:Event) {

  }

  create(){

  }

  supprimerCompte(id:number){

  }

}
