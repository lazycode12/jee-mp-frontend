import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpService } from '../../../services/http.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-importer-sp',
    imports: [NgClass, NavBarComponent,ToastModule, SideBarComponent,ButtonModule ],
    templateUrl: './importer-sp.component.html',
    providers: [MessageService]
})
export class ImporterSPComponent {

  isOpen:boolean = true;
  isSubmitted:boolean = false;
  sidebarItems: any = [];
  selecteedFile: File | null = null;

  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  httpService: HttpService = inject(HttpService);
  messageService :  MessageService = inject( MessageService);

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-sp")
  }

  onFileChange(e:any){
    this.selecteedFile = e.target.files[0];
  }

  importer_sp(){
    console.log("clicked")
    if (!this.selecteedFile) {
      this.messageService.add({ severity: 'warn', summary: 'Attention', detail: "Aucun fichier sélectionné." });
      return;
    }
    this.httpService.import_sp(this.selecteedFile).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: "Fichier téléchargé et traité avec succès" });
      },
      error: ()=>  this.messageService.add({ severity: 'error', summary: 'Succès.', detail: "Fichier téléchargé et traité avec succès" })
    })
  }
}
