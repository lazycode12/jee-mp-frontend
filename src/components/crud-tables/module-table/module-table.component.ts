import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-module-table',
  imports: [ButtonModule,ConfirmDialog, ToastModule, DialogModule, ReactiveFormsModule, NgFor],
  templateUrl: './module-table.component.html',
  providers: [MessageService, ConfirmationService]
})
export class ModuleTableComponent {

  selectedModule: any;
  modules: any;
  niveaux: any;
  resps: any;

  visible_edit: boolean = false;

  //services
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  fg = new FormGroup({
    titre : new FormControl(""),
    code : new FormControl("")
  })
  deleteModule(id:number){
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
        this.httpservice.deleteModule(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'succès', detail: 'le module a été supprimé avec succès' });
            this.getModules();
        },
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){
    e.preventDefault();
    this.httpservice.editModule(this.selectedModule.id, this.fg.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: 'le module a été modifier avec succès' });
        this.getModules();
        this.visible_edit = false;
      },
      error: (err) => console.log(err)
    })
  }

  getModules(){
    this.httpservice.getModules().subscribe({
      next: res => this.modules = res
    })
  }

  getEnseigants(){
    this.httpservice.getEnseignants().subscribe({
      next: (res) => this.resps = res
    })
  }

  getNiveaux(){
    this.httpservice.getNiveaux().subscribe({
      next: (res) => this.niveaux = res
    })
  }

  showDialogEdit(module:any){
    let data = {
      titre : module.titre,
      code : module.code
    }
    this.selectedModule = module;
    this.fg.patchValue(data);
    this.visible_edit = true;
  }

  ngOnInit() {
    this.getModules();
    this.getEnseigants();
  }

}
