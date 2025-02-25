import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass, NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-gestion-notes',
  imports: [SideBarComponent, NavBarComponent, NgClass, ButtonModule, DialogModule, FormsModule, NgFor, ToastModule],
  templateUrl: './gestion-notes.component.html',
  providers: [MessageService]
})
export class GestionNotesComponent {

    selectedImportCollectNotesParModuleFile: File | null = null;
    selectedDeliNotesFile: File | null = null;
    sidebarItems: any = [];
    isOpen: boolean = true;
    niveaux:any = [];
    modules: any = [];
    semestres:any = [];

    id_module: number=0;
    id_niveau: number=0;
    id_niveau_deli:number = 0;
    id_semester: number=0;


    //services
    messageService :  MessageService = inject( MessageService);
    httpservice: HttpService = inject(HttpService);

    // dialogues visibility variables
    export_notes_module_v : boolean = false;
    export_notes_deli_v : boolean = false;
    import_notes_module_v : boolean = false;
    import_notes_deli_v : boolean = false;

    // services
    sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

    //ngOnInit function
    ngOnInit(){
        this.sidebarItems = this.sideBarService.getSideBarData("admin-notes");
        this.getSemestres();
        this.getNiveaux();
        this.getModules();
    }

    getNiveaux(){
      this.httpservice.getNiveaux().subscribe({
        next: res => this.niveaux = res
      })
    }

    getSemestres(){
      this.httpservice.getSemestres().subscribe({
        next: (res) => this.semestres = res
      })
    }

    getModules(){
      this.httpservice.getModules().subscribe({
        next: res => this.modules = res
      })
    }

    // show dialogues functions
    show_export_notes_module(){
      this.export_notes_module_v = true;
    }

    show_export_notes_deli(){
      this.export_notes_deli_v = true;
    }

    show_import_notes_module(){
      this.import_notes_module_v = true;
    }

    show_import_notes_deli(){
      this.import_notes_deli_v = true;
    }

    // export / import fucntions
    exportCollectNotes(){
      this.httpservice.exportCollectNotesParModule(this.id_semester, this.id_niveau, this.id_module);
      this.export_notes_module_v = false;
    }

    importCollectNotes(){
      if(this.selectedImportCollectNotesParModuleFile){
        this.httpservice.importCollectNotesParModule(this.selectedImportCollectNotesParModuleFile).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Fichier téléchargé et traité avec succès" });
            this.import_notes_module_v = false;
        },
          error: ()=>  this.messageService.add({ severity: 'success', summary: 'Succès.', detail: "Fichier téléchargé et traité avec succès" })
        })
      }
    }

    importDeliNotes(){
      if(this.selectedDeliNotesFile){
        this.httpservice.importDeliNotes(this.selectedDeliNotesFile).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Fichier téléchargé et traité avec succès" });
            this.import_notes_deli_v = false;
        },
          error:()=> this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Fichier téléchargé et traité avec succès" })
        })
      }
    }

    onImportCollectNotesFileChange(event: any) {
      this.selectedImportCollectNotesParModuleFile = event.target.files[0];
    }

    onImportCollectNotesDeliFileChange(e:any){
      this.selectedDeliNotesFile = e.target.files[0];
    }

    exporter_fichier_deli(){
      this.httpservice.exportDeliCollectNotes(this.id_niveau_deli);
      this.export_notes_deli_v = false;
    }
}
