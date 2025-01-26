import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-filiere-table',
  imports: [ButtonModule,ConfirmDialog, ToastModule, DialogModule, ReactiveFormsModule],
  templateUrl: './filiere-table.component.html',
  providers: [MessageService, ConfirmationService]
})
export class FiliereTableComponent {

  selectedFeliere: any;
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
    annee_fin_accreditation : new FormControl("")
  })

  showDialogEdit(){ //takes parameter of type filiere
    this.visible_edit = true;
  }
  showDialogView(){ //takes parameter of type filiere
    this.visible_view = true;
  }

  edit(e: Event){

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
          next: () => this.messageService.add({ severity: 'info', summary: 'succès', detail: 'le filiere a été supprimé avec succès' }),
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }
}
