import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FiliereTableComponent } from '../../../components/crud-tables/filiere-table/filiere-table.component';
import { NiveauTableComponent } from '../../../components/crud-tables/niveau-table/niveau-table.component';
import { ModuleTableComponent } from '../../../components/crud-tables/module-table/module-table.component';
import { MatiereTableComponent } from '../../../components/crud-tables/matiere-table/matiere-table.component';


@Component({
    selector: 'gestion-sps-modules',
    imports: [NavBarComponent, NavBarComponent, SideBarComponent, NgClass, FormsModule, ButtonModule, FiliereTableComponent, NiveauTableComponent, ModuleTableComponent, MatiereTableComponent],
    templateUrl: './gestion-sps.component.html'
})
export class GestionSpsComponent {

    sidebarItems: any = [];
    isOpen: boolean = true;
    table: string = "";
    typeTable: string = "filiere";
    filieres: any = [];

    // services
    sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

    //ngOnInit function
    ngOnInit(){
        this.sidebarItems = this.sideBarService.getSideBarData("admin-sp")
    }
}
