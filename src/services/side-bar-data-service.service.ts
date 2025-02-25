import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarDataServiceService {

  constructor() { }

  protected admin_sp: any[] = [
    { label: "gestion sp", link: '/gestion-sp', icon: 'pi-sitemap'},
    { label: 'creer sp', link: '/creer-sp', icon: 'pi-hammer' },
    { label: 'importer sp', link: '/importer-sp', icon: 'pi-file-import' }
  ];

  protected admin_user: any[] = [
    {label: "gestion des personnes", link: '/gestion-personnes', icon: 'pi-user-edit'},
    {label: "gestion des comptes", link: '/gestion-comptes', icon: 'pi-lock-open'},
    {label: "gestion-enseignants", link: '/gestion-enseignants', icon: 'pi-cog'}
  ]

  protected admin_notes: any[] = [
    {label: "gestion des etudiants", link: '/gestion-etudiants', icon: 'pi-user-edit'},
    {label: "gestion des notes", link: '/gestion-notes', icon: 'pi-cog'},
    {label: "notes d'etudiant", link: '/notes-etudiant', icon: 'pi-clipboard'},
    {label: "gestion semsesters", link: '/gestion-semsesters', icon: 'pi-cog'}
  ]

  getSideBarData(type: string): any{
    let data: any;

    switch(type){
      case "admin-sp":
        data = this.admin_sp;
        break;
      case "admin-user":
        data = this.admin_user;
        break;
      case "admin-notes":
        data = this.admin_notes;
    }

    return data;
  }


}
