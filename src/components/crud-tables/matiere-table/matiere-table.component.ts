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
  selector: 'app-matiere-table',
  imports: [ButtonModule,ConfirmDialog, ToastModule, DialogModule, ReactiveFormsModule, TableModule],
  templateUrl: './matiere-table.component.html',
  providers: [MessageService, ConfirmationService]
})
export class MatiereTableComponent {

  matieres: any = [];
  selectedNatiere: any;
  visible_edit: boolean = false;
  visible_view: boolean = false;

  //services
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  fg = new FormGroup({
    titre : new FormControl("")
  })

  getMatieres(){
    this.httpservice.getMatieres().subscribe({
      next: (res) => this.matieres = res
    })
  }

  deleteMatiere(id:number){
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
          next: () => this.messageService.add({ severity: 'success', summary: 'succès', detail: 'la matiere a été supprimé avec succès' }),
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){
    this.httpservice.editMatiere(this.selectedNatiere.id, this.fg.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: 'la matiere a été modifier avec succès' });
        this.getMatieres();
        this.visible_edit = false;
    },
      error: (err) => console.log(err)
    })
  }

  showDialogEdit(matiere:any){
    this.selectedNatiere = matiere;
    this.fg.patchValue({titre: matiere.titre})
    this.visible_edit = true;
  }

  ngOnInit(){
    this.getMatieres();
  }
}
