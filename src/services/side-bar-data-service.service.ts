import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarDataServiceService {

  constructor() { }

  protected admin_sp: any[] = [
    { label: "consulter-modules", link: '/consulter-modules', icon: 'pi-home'},
    { label: 'gestion-sp', link: '/gestion-sp', icon: 'pi-briefcase' },
    { label: 'importer-sp', link: '/importer-sp', icon: 'pi-calendar' }
  ];

  getSideBarData(type: string): any{
    let data: any;

    switch(type){
      case "admin-sp":
        data = this.admin_sp
    }

    return data;
  }


}
