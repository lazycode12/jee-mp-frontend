import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filiere-table',
  imports: [ButtonModule,ConfirmDialog, ToastModule, DialogModule, ReactiveFormsModule, NgFor],
  templateUrl: './filiere-table.component.html',
  providers: [MessageService, ConfirmationService]
})
export class FiliereTableComponent {

  selectedFeliere: any;
  filieres: any = [];
  visible_edit: boolean = false;
  visible_view: boolean = false;

  //services
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  //formgroup
  fg = new FormGroup({
    intitule : new FormControl(""),
    alias : new FormControl(""),
    annee_accreditation: new FormControl(""),
    annee_fin_accreditation : new FormControl(""),
    x : new FormControl(0),
    y : new FormControl(0),
  })

  showDialogEdit(filiere: any){
    this.selectedFeliere = filiere;

    let data = {
      intitule: filiere.intitule,
      alias: filiere.alias,
      annee_accreditation: filiere.annee_accreditation,
      annee_fin_accreditation: filiere.annee_fin_accreditation,
      x: filiere.x,
      y: filiere.y
    }
    this.fg.patchValue(data);
    this.visible_edit = true;
  }

  edit(e: Event){
    e.preventDefault();
    this.httpservice.editFiliere(this.selectedFeliere.id ,this.fg.value).subscribe({
      next: (res:any) => {
        this.messageService.add({severity: 'success',summary: "Succès", detail: "filiere a été modifié avec Succès"});
        this.visible_edit = false;
        this.getFilieres();
      },
      error: (err: any) => this.messageService.add({severity: 'error',summary: "Erreur", detail: "quelque chose s'est mal passé"})
    })
  }

  deleteFiliere(id:number){
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
        this.httpservice.deleteFiliere(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'succès', detail: 'le filiere a été supprimé avec succès' });
            this.getFilieres();
        },
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  // get All filieres
  getFilieres(){
    this.httpservice.getFilieres().subscribe({
      next: res => this.filieres = res,
      error: err => console.log(err)
    })
  }

  //ngOnInit function
  ngOnInit(){
      this.getFilieres();
  }
}
