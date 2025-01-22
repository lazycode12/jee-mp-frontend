import { Routes } from '@angular/router';

import { CreerSpsComponent } from '../pages/admin-sp/creer-sps/creer-sps.component';
import { ImporterSPComponent } from '../pages/admin-sp/importer-sp/importer-sp.component';
import { GestionSpsComponent } from '../pages/admin-sp/gestions-sps/gestion-sps.component';


export const routes: Routes = [
    {path: "gestion-sp", component: GestionSpsComponent},
    {path: "creer-sp", component: CreerSpsComponent},
    {path: "importer-sp", component: ImporterSPComponent},
    // default
    // {path: "", redirectTo: "/login", pathMatch: "full"}
];
