import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@Component({

  selector: 'app-niveau-table',
  imports: [ButtonModule,ConfirmDialog, ToastModule, DialogModule, ReactiveFormsModule],
  templateUrl: './niveau-table.component.html',
  providers: [MessageService, ConfirmationService]})
export class NiveauTableComponent {
  selectedNatiere: any;
  visible_edit: boolean = false;
  visible_view: boolean = false;

  //services
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  fg = new FormGroup({
    titre : new FormControl(""),
    code : new FormControl(""),
    enseignant : new FormControl(""),
    niveau : new FormControl("")
  })
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
          next: () => this.messageService.add({ severity: 'info', summary: 'succès', detail: 'le module a été supprimé avec succès' }),
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){

  }

  showDialogEdit(){ //takes parameter of type filiere
    this.visible_edit = true;
  }
  showDialogView(){ //takes parameter of type filiere
    this.visible_view = true;
  }
}
