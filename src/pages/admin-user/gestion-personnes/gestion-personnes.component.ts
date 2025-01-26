import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { NgClass } from '@angular/common';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-gestion-personnes',
  imports: [ConfirmDialog, ToastModule, SideBarComponent, NavBarComponent, NgClass, FormsModule, Dialog, ButtonModule, ReactiveFormsModule, TagModule],
  templateUrl: './gestion-personnes.component.html',
  providers: [MessageService, ConfirmationService]
})
export class GestionPersonnesComponent {

  sidebarItems: any = [];
  isOpen: boolean = true;
  visible_create: boolean = false;
  selectedPersonne: any;
  visible_edit: boolean = false;
  visible_view: boolean = false;
  visible_associate: boolean = false;

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

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

  fg_account = new FormGroup({
    role : new FormControl(""),
    active : new FormControl(1),
    locked : new FormControl(0),
  })

  deletePersonne(id:number){
    this.confirmationService.confirm({
      // target: event.target as EventTarget,
      message: 'Veuillez confirmer pour continuer',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
          label: 'Annuler',
          severity: 'secondary',
          outlined: true,
      },
      acceptButtonProps: {
          label: 'supprimer',
          severity: 'danger',
      },
      accept: () => {
        this.httpservice.deleteMatiere(id).subscribe({
          next: () => this.messageService.add({ severity: 'info', summary: 'succès', detail: 'la matiere a été supprimé avec succès' }),
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){

  }

  create(e: Event){

  }

  // show popup
  showDialogCreate() {
    this.visible_create = true;
  }

  showDialogEdit(){ //takes parameter of type filiere
    this.visible_edit = true;
  }
  showDialogView(){ //takes parameter of type filiere
    this.visible_view = true;
  }

  showDialogAssociate(){
    this.visible_associate = true;
  }

  associerRole(id:number){

  }

}
