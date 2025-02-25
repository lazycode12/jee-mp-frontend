import { HttpService } from './../../../services/http.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { NgClass, NgFor } from '@angular/common';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-gestion-personnes',
  imports: [ConfirmDialog,ToastModule,SideBarComponent,NgFor, NavBarComponent, NgClass, FormsModule, Dialog, ButtonModule, ReactiveFormsModule, TagModule],
  templateUrl: './gestion-comptes.component.html',
  providers: [MessageService, ConfirmationService]
})
export class GestionComptesComponent {

  sidebarItems: any = [];
  isOpen: boolean = true;
  visible_view: boolean = false;
  visible_edit: boolean = false;
  users: any = [];
  selectedUser: any;

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpService : HttpService = inject(HttpService);


  getUsers(){
    this.httpService.getComptes().subscribe({
      next: res => this.users = res
    })
  }
  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-user");
    this.getUsers();
  }

  fg = new FormGroup({
    role : new FormControl(""),
    active : new FormControl(""),
    locked : new FormControl("")

  })

  showEditDialog(user:any){
    let data = {
      role : user.role,
      active : user.active,
      locked : user.locked
    }
    this.fg.patchValue(data);
    this.selectedUser = user;
    this.visible_edit = true;
  }

  showCompte(){
    this.visible_view = true;
  }

  edit(e:Event) {
    e.preventDefault();
    this.httpService.editCompte(this.selectedUser.id ,this.fg.value).subscribe({
      next: (res:any) => {
        this.messageService.add({severity: 'success',summary: "Succès", detail: "compte a été modifié avec Succès"});
        this.visible_edit = false;
        this.getUsers();
      },
      error: (err: any) => this.messageService.add({severity: 'error',summary: "Erreur", detail: "quelque chose s'est mal passé"})
    })
  }


  deleteUser(id:number){
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
        this.httpService.deleteCompte(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'succès', detail: "l'utilsateur a été supprimé avec succès" });
            this.getUsers();
        },
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

}
