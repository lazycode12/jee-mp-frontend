import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FiliereFormComponent } from '../../../components/forms/filiere-form/filiere-form.component';
import { NiveauFormComponent } from '../../../components/forms/niveau-form/niveau-form.component';
import { ModuleFormComponent } from '../../../components/forms/module-form/module-form.component';
import { ElementFormComponent } from '../../../components/forms/element-form/element-form.component';

@Component({
    selector: 'app-creer-sps',
    imports: [NavBarComponent, NavBarComponent, SideBarComponent, NgClass, FormsModule, ButtonModule, NgIf, FiliereFormComponent, NiveauFormComponent, ModuleFormComponent, ElementFormComponent ],
    templateUrl: './creer-sps.component.html'
})
export class CreerSpsComponent {
    sidebarItems: any = [];
    isOpen: boolean = true;
    table: string = "";
    typeForm: string = "filiere";

    // services
    sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);

    //ngOnInit function
    ngOnInit(){
        this.sidebarItems = this.sideBarService.getSideBarData("admin-sp")
    }


}
