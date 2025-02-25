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
  selector: 'app-gestion-enseignants',
  imports: [ConfirmDialog, ToastModule, SideBarComponent, NavBarComponent, NgClass, FormsModule, Dialog, ButtonModule, ReactiveFormsModule, TagModule, NgFor],
  templateUrl: './gestion-enseignants.component.html',
  providers: [MessageService, ConfirmationService]
})
export class GestionEnseignantsComponent {

  sidebarItems: any = [];
  enseignants: any =[];
  isOpen: boolean = true;
  visible_create: boolean = false;
  selectedEnseignant: any;
  visible_edit: boolean = false;

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  fg = new FormGroup({
    nom : new FormControl(""),
    prenom : new FormControl("")
  })


  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-user");
    this.getEnseigants();
  }

  deleteEnseignant(id:number){
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
        this.httpservice.deleteEnseignant(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'succès', detail: "l'enseignant a été supprimé avec succès" });
            this.getEnseigants();
          },
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){
    e.preventDefault();

    this.httpservice.editEnseignant(this.selectedEnseignant.id, this.fg.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: 'La matière a été créée avec succès', life: 2000 })
        this.fg.reset();
        this.getEnseigants();
        this.visible_edit = false;
      }
    })
  }

  create(e: Event){
    e.preventDefault();
    this.httpservice.creerEnseignant(this.fg.value).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: "L'enseignant' a été créée avec succès", life: 2000 })
        this.fg.reset();
        this.getEnseigants();
        this.visible_create = false;
      },
      error: err => {
        this.messageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }

  getEnseigants(){
    this.httpservice.getEnseignants().subscribe({
      next: (res) => this.enseignants = res
    })
  }

  // show popup
  showDialogCreate() {
    this.visible_create = true;
  }

  showDialogEdit(enseignant: any){
    let data = {
      nom: enseignant.nom,
      prenom: enseignant.prenom
    }
    this.fg.patchValue(data);
    this.selectedEnseignant = enseignant;
    this.visible_edit = true;
  }

}
