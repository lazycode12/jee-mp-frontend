import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({

  selector: 'app-niveau-table',
  imports: [ButtonModule,ConfirmDialog, ToastModule, DialogModule, ReactiveFormsModule, TableModule],
  templateUrl: './niveau-table.component.html',
  providers: [MessageService, ConfirmationService]})
export class NiveauTableComponent {

  selectedNiveau: any;
  niveaux:any = [];
  visible_edit: boolean = false;

  //services
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  fg = new FormGroup({
    intitule : new FormControl(""),
    alias : new FormControl(""),
    id_niveau_suivant: new FormControl(null)
  })

  //ngOnInit function
  ngOnInit(){
    this.getNiveaux();
}
  getNiveaux(){
    this.httpservice.getNiveaux().subscribe({
      next: res => this.niveaux = res
    })
  }

  deleteNiveau(id:number){
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
        this.httpservice.deleteNiveau(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'succès', detail: 'le module a été supprimé avec succès' });
            this.getNiveaux();
        },
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){
    e.preventDefault();
    if(this.fg.get("id_niveau_suivant")?.value != null){
      this.httpservice.editNiveau(this.selectedNiveau.id,this.fg.value, this.fg.get("id_niveau_suivant")?.value ?? 0 ).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'succès', detail: 'le niveau a été modifier avec succès' });
          this.getNiveaux();
          this.visible_edit = false;
        }
      })
    }else{
      this.httpservice.editNiveau(this.selectedNiveau.id,this.fg.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'succès', detail: 'le niveau a été modifier avec succès' });
          this.getNiveaux();
          this.visible_edit = false;
        }
      })
    }
  }

  showDialogEdit(niveau:any){
    let data = {
      intitule : niveau.intitule,
      alias : niveau.alias,
      id_niveau_suivant: niveau.id_niveau_suivant ? niveau.id_niveau_suivant.id : 0
    }
    this.selectedNiveau = niveau;
    this.fg.patchValue(data);
    this.visible_edit = true;
  }
}
