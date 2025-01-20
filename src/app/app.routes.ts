import { Routes } from '@angular/router';
import { ConsulterModulesComponent } from '../pages/admin-sp/consulter-modules/consulter-modules.component';
import { GestionSPComponent } from '../pages/admin-sp/gestion-sp/gestion-sp.component';
import { ImporterSPComponent } from '../pages/admin-sp/importer-sp/importer-sp.component';


export const routes: Routes = [
    {path: "consulter-modules", component: ConsulterModulesComponent},
    {path: "gestion-sp", component: GestionSPComponent},
    {path: "importer-sp", component: ImporterSPComponent},
    // default
    // {path: "", redirectTo: "/login", pathMatch: "full"}
];
