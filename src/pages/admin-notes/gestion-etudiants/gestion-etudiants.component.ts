import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-gestion-etudiants',
  imports: [SideBarComponent,InputTextModule,FormsModule, TableModule,IconFieldModule,InputIconModule,  NavBarComponent, NgClass,FormsModule, ConfirmDialog, DialogModule,ReactiveFormsModule, ToastModule, ButtonModule],
  templateUrl: './gestion-etudiants.component.html',
  providers: [MessageService, ConfirmationService]
})
export class GestionEtudiantsComponent {

    sidebarItems: any = [];
    isOpen: boolean = true;
    etudiants!: any;
    selectedEtudiant:any;
    visible_edit: boolean = false;
    visible_view: boolean = false;
    selecteedFile: File | null = null;
    niveaux: any;
    loading: boolean = true;
    selectedNiveauId: number | null = null;
    selectedNiveau: string = "";
    aliases: any = [];

    // services
    sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
    messageService :  MessageService = inject( MessageService);
    confirmationService: ConfirmationService = inject(ConfirmationService);
    httpService: HttpService = inject(HttpService);

    //formgroup
    fg = new FormGroup({
      nom : new FormControl(""),
      prenom : new FormControl(""),
      cne: new FormControl(""),
    })

    //ngOnInit function
    ngOnInit(){
        this.sidebarItems = this.sideBarService.getSideBarData("admin-notes");
        this.getEtudiants();
        this.getNiveaux()
    }


    getNiveaux(){
      this.httpService.getNiveaux().subscribe({
        next: res => {
          this.niveaux = res;
          this.aliases = res.map( (n:any) => n.alias)
        }
      })
    }

    showDialogEdit(etudiant: any){
      this.selectedEtudiant = etudiant;

      let data = {
        nom: etudiant.nom,
        prenom: etudiant.prenom,
        cne: etudiant.cne
      }
      this.fg.patchValue(data);
      this.visible_edit = true;
    }

    // get All etudiants
    getEtudiants(){
      this.httpService.getEtudiants().subscribe({
        next: res => this.etudiants = res,
        error: err => console.log(err)
      })
    }

    // get etudiants by niveau id
    onClasseChange(): void {
      if (this.selectedNiveauId) {
        this.httpService.getEtudiantsByNiveau(this.selectedNiveauId).subscribe({
          next: data => this.etudiants = data}
        )
      } else {
        this.etudiants = [];
      }
    }

    edit(e: Event){
      e.preventDefault();
      this.httpService.editEtudiant(this.selectedEtudiant.id ,this.fg.value).subscribe({
        next: (res:any) => {
          this.messageService.add({severity: 'success',summary: "Succès", detail: "l'etudiant a été modifié avec Succès"});
          this.visible_edit = false;
          this.getEtudiants();
        },
        error: (err: any) => this.messageService.add({severity: 'error',summary: "Erreur", detail: "quelque chose s'est mal passé"})
      })
    }

    deleteEtudiant(id:number){
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
          this.httpService.deleteEtudiant(id).subscribe({
            next: () => {
              this.messageService.add({ severity: 'info', summary: 'succès', detail: "l'etudiant a été supprimé avec succès" });
              this.getEtudiants();
          },
            error: () => this.messageService.add({ severity: 'error', summary: "erreur", detail: "quelque chose s'est mal passé"})
          })
        },
    });
    }

    onChange(e:any){
      this.selecteedFile = e.target.files[0];
    }

    importer(){
      if (!this.selecteedFile) {
        this.messageService.add({ severity: 'warn', summary: 'Attention', detail: "Aucun fichier sélectionné." });
        return;
      }
      this.httpService.import_inscription(this.selecteedFile).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: "" });
        },
        error: ()=>  this.messageService.add({ severity: 'error', summary: 'Succès.', detail: "" })
      })
    }
    }

