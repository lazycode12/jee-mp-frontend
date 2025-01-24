import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarDataServiceService {

  constructor() { }

  protected admin_sp: any[] = [
    { label: "gestion sp", link: '/gestion-sp', icon: 'pi-home'},
    { label: 'creer sp', link: '/creer-sp', icon: 'pi-briefcase' },
    { label: 'importer sp', link: '/importer-sp', icon: 'pi-calendar' }
  ];

  protected admin_user: any[] = [
    {label: "gestion des personnes", link: '/gestion-personnes', icon: 'pi-home'},
    {label: "gestion des comptes", link: '/gestion-comptes', icon: 'pi-home'}
  ]

  protected admin_notes: any[] = [
    {label: "gestion des etudiants", link: '/gestion-etudiants', icon: 'pi-home'},
    {label: "gestion des notes", link: '/gestion-notes', icon: 'pi-home'},
    {label: "notes d'etudiant", link: '/notes-etudiant', icon: 'pi-home'}
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
