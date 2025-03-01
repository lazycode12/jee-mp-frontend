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
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-gestion-semester',
  imports: [ConfirmDialog, ToastModule, IconFieldModule, InputTextModule , InputIconModule,  TableModule, SideBarComponent, NavBarComponent, NgClass, FormsModule, Dialog, ButtonModule, ReactiveFormsModule, TagModule],
  templateUrl: './gestion-semester.component.html',
  providers: [ConfirmationService, MessageService]
})
export class GestionSemesterComponent {
  sidebarItems: any = [];
  semestres: any =[];
  selectedSemester: any;
  isOpen: boolean = true;
  visible_create: boolean = false;
  visible_edit: boolean = false;

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  messageService :  MessageService = inject( MessageService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  httpservice: HttpService = inject(HttpService);

  fg = new FormGroup({
    semester : new FormControl(""),
    session : new FormControl(""),
    anneEtude : new FormControl("")
  })

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-notes");
    this.getSemestres();
  }

  deleteSemester(id:number){
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
        this.httpservice.deleteSemestre(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'info', summary: 'succès', detail: "l'enseignant a été supprimé avec succès" });
            this.getSemestres();
          },
          error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
        })
      },
  });
  }

  edit(e: Event){
    e.preventDefault();

    this.httpservice.editSemestres(this.selectedSemester.id, this.fg.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: 'semester a été créée avec succès', life: 2000 })
        this.fg.reset();
        this.getSemestres();
        this.visible_edit = false;
      }
    })
  }

  create(e: Event){
    e.preventDefault();
    this.httpservice.creerSemestres(this.fg.value).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: "semester a été créée avec succès", life: 2000 })
        this.fg.reset();
        this.getSemestres();
        this.visible_create = false;
      },
      error: err => {
        this.messageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }

  getSemestres(){
    this.httpservice.getSemestres().subscribe({
      next: (res) => this.semestres = res
    })
  }

  // show popup
  showDialogCreate() {
    this.visible_create = true;
  }

  showDialogEdit(semester: any){
    let data = {
      semester : semester.semester,
      session : semester.session,
      anneEtude : semester.anneEtude
    }
    this.fg.patchValue(data);
    this.selectedSemester = semester;
    this.visible_edit = true;
  }
}
