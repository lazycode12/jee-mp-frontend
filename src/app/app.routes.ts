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
import { GestionSemesterComponent } from '../pages/admin-notes/gestion-semester/gestion-semester.component';
import { GestionEnseignantsComponent } from '../pages/admin-user/gestion-enseignants/gestion-enseignants.component';
import { MissingComponent } from '../pages/missing/missing.component';
import { loginGuard } from '../services/login.guard';


export const routes: Routes = [
    // admin-sp routes
    {path: "gestion-sp", component: GestionSpsComponent, canActivate: [loginGuard], data: {expectedRole: "ROLE_ADMIN_SP"}},
    {path: "creer-sp", component: CreerSpsComponent, canActivate: [loginGuard], data: {expectedRole: "ROLE_ADMIN_SP"}},
    {path: "importer-sp", component: ImporterSPComponent, canActivate: [loginGuard], data: {expectedRole: "ROLE_ADMIN_SP"}},

    // admin-user routes
    {path: "gestion-personnes", component: GestionPersonnesComponent, canActivate: [loginGuard], data: {expectedRole: 'ROLE_ADMIN_USER'}},
    {path: "gestion-comptes", component: GestionComptesComponent, canActivate: [loginGuard], data: {expectedRole: 'ROLE_ADMIN_USER'}},
    {path: "gestion-enseignants", component: GestionEnseignantsComponent, canActivate: [loginGuard], data: {expectedRole: 'ROLE_ADMIN_USER'}},

    // admin-notes routes
    {path: "gestion-etudiants", component: GestionEtudiantsComponent, canActivate: [loginGuard], data: {expectedRole: "ROLE_ADMIN_NOTES"}},
    {path: "gestion-notes", component: GestionNotesComponent, canActivate: [loginGuard], data: {expectedRole: "ROLE_ADMIN_NOTES"}},
    {path: "notes-etudiant", component: NotesEtudiantComponent, canActivate: [loginGuard], data: {expectedRole: "ROLE_ADMIN_NOTES"}},
    {path: "gestion-semsesters", component: GestionSemesterComponent, canActivate: [loginGuard], data: {expectedRole: "ROLE_ADMIN_NOTES"}},

    //login
    {path: "login", component: LoginComponent},
    // default
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path:'missing', title : 'Non autorisé', component: MissingComponent},
    {path:'**', title : 'page non trouvee', component: MissingComponent}
];
