import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { NgClass, NgFor } from '@angular/common';
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
  imports: [ConfirmDialog, ToastModule, SideBarComponent,NgFor, NavBarComponent, NgClass, FormsModule, Dialog, ButtonModule, ReactiveFormsModule, TagModule],
  templateUrl: './gestion-personnes.component.html',
  providers: [MessageService, ConfirmationService]
})
export class GestionPersonnesComponent {

  sidebarItems: any = [];
  isOpen: boolean = true;
  visible_create: boolean = false;
  selectedPersonne: any;
  selected_personne_id: number = 0;
  personnes:any = [];
  visible_edit: boolean = false;
  visible_associate: boolean = false;

  membershipStatus: { [key: number]: {hasAccount:boolean, role: string} } = {};

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-user");
    this.getPersonnes();
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
  })

  getPersonnes(){
    this.httpservice.getPersonnes().subscribe({
      next: res => {
        this.personnes = res;
        this.personnes.forEach((personne : any)=> {
          this.checkMemberStatus(personne.id);
        });
      }
    })
  }
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
        this.httpservice.deletePersonne(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'succès', detail: 'le personne a été supprimé avec succès' });
            this.getPersonnes();
        },
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){
    e.preventDefault();
    this.httpservice.editPersonne(this.selectedPersonne.id, this.fg.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: 'le personne a été modifier avec succès' });
        this.getPersonnes();
        this.visible_edit = false;
      },
      error: (err) => console.log(err)
    })
  }

  create(e: Event){
    e.preventDefault();
    console.log(this.fg.value)
    this.httpservice.creerPersonne(this.fg.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: 'Le personne a été créée avec succès', life: 2000 });
        this.getPersonnes();
        this.visible_create = false;
        this.fg.reset();
      },
      error: () => {
        this.messageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }

  checkMemberStatus(id: number) {
    this.httpservice.haveAccount(id).subscribe({
      next: res => this.membershipStatus[id] = {hasAccount: res.hasAccount, role: res.role},
      error: (err) => {
        console.error('Error fetching member status:', err);
        this.membershipStatus[id] = {hasAccount: false, role: "n/a"};
      }}
    );
  }

  // show popup
  showDialogCreate() {
    this.visible_create = true;
  }

  showDialogEdit(personne: any){
    let data = {
      nom : personne.nom,
      prenom : personne.prenom,
      cin : personne.cin,
      email : personne.email,
      tele : personne.tele
    }
    this.fg.patchValue(data);
    this.selectedPersonne = personne;
    this.visible_edit = true;
  }

  showDialogAssociate(id_personne: number){
    this.selected_personne_id = id_personne;
    this.visible_associate = true;
    this.getPersonnes();
  }

  associerRole(){
    this.httpservice.creerCompte(this.fg_account.value, this.selected_personne_id).subscribe({
     next: (res:any) => {
      this.visible_associate = false;
      this.messageService.add({ severity: 'info', summary: "informations d'authentification", detail:`login: ${res.login}  mot de passe: ${res.password}`, sticky: true });
     }
    })
  }


}
