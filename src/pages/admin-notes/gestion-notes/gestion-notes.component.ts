import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-gestion-notes',
  imports: [SideBarComponent, NavBarComponent, NgClass, ButtonModule, DialogModule],
  templateUrl: './gestion-notes.component.html',
  styles: ``
})
export class GestionNotesComponent {

    sidebarItems: any = [];
    isOpen: boolean = true;

    // dialogues visibility variables
    export_notes_module_v : boolean = false;
    export_notes_deli_v : boolean = false;
    import_notes_module_v : boolean = false;
    import_notes_deli_v : boolean = false;

    // services
    sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

    //ngOnInit function
    ngOnInit(){
        this.sidebarItems = this.sideBarService.getSideBarData("admin-notes")
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
    exporter_fichier_module(){

    }

    exporter_fichier_deli(){}
}
