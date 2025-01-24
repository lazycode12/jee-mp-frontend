import { Routes } from '@angular/router';

import { CreerSpsComponent } from '../pages/admin-sp/creer-sps/creer-sps.component';
import { ImporterSPComponent } from '../pages/admin-sp/importer-sp/importer-sp.component';
import { GestionSpsComponent } from '../pages/admin-sp/gestions-sps/gestion-sps.component';
import { GestionPersonnesComponent } from '../pages/admin-user/gestion-personnes/gestion-personnes.component';
import { GestionComptesComponent } from '../pages/admin-user/gestion-comptes/gestion-comptes.component';
import { GestionEtudiantsComponent } from '../pages/admin-notes/gestion-etudiants/gestion-etudiants.component';
import { GestionNotesComponent } from '../pages/admin-notes/gestion-notes/gestion-notes.component';
import { NotesEtudiantComponent } from '../pages/admin-notes/notes-etudiant/notes-etudiant.component';
import { LoginComponent } from '../pages/login/login.component';


export const routes: Routes = [
    // admin-sp routes
    {path: "gestion-sp", component: GestionSpsComponent},
    {path: "creer-sp", component: CreerSpsComponent},
    {path: "importer-sp", component: ImporterSPComponent},

    // admin-user routes
    {path: "gestion-personnes", component: GestionPersonnesComponent},
    {path: "gestion-comptes", component: GestionComptesComponent},

    // admin-notes routes
    {path: "gestion-etudiants", component: GestionEtudiantsComponent},
    {path: "gestion-notes", component: GestionNotesComponent},
    {path: "notes-etudiant", component: NotesEtudiantComponent},

    //login
    {path: "login", component: LoginComponent},
    // default
    {path: "", redirectTo: "/login", pathMatch: "full"}
];
