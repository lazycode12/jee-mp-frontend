import { HttpService } from './../../../services/http.service';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { NavBarComponent } from '../../../components/nav-bar/nav-bar.component';
import { NgClass, NgFor } from '@angular/common';
import { SideBarDataServiceService } from '../../../services/side-bar-data-service.service';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-notes-etudiant',
  imports: [SideBarComponent, NavBarComponent, NgClass, NgFor, FormsModule, CheckboxModule, ButtonModule],
  templateUrl: './notes-etudiant.component.html',
  styles: ``
})
export class NotesEtudiantComponent {

  sidebarItems: any = [];
  isOpen: boolean = true;
  anne_etude: string = "";
  id_module: number = 0;
  cne: string = "";
  etudiant:any;
  id_nivea: number = 0;
  modules: any = [];
  module:any;
  singleNote:any;
  singleModule:any;


  // services
  sideBarService: SideBarDataServiceService = inject(SideBarDataServiceService);
  HttpService: HttpService = inject(HttpService);


  getEtudiantByCne(){
    this.HttpService.getEtudaintByCne(this.cne).subscribe({
      next: (res) => this.etudiant = res
    })
  }

  getModules(){
    this.HttpService.getModules().subscribe({
      next: res => this.modules = res
    })
  }

  getModuleNId(){

    this.HttpService.getModule(this.id_module).subscribe({
      next: res => this.module = res
    })
  }

  //ngOnInit function
  ngOnInit(){
    this.sidebarItems = this.sideBarService.getSideBarData("admin-notes");
    this.getModules();
  }


  getSingleNote(){
    this.HttpService.getNoteByEtudiantIdAndModuleIdAndAnneEtude(this.cne,  this.id_module, this.anne_etude).subscribe({
      next: (res) => {
        this.singleNote = res;
        this.HttpService.getModule(this.id_module).subscribe({
          next: res=>this.singleModule = res
        })
      }
    })


  }

  consulter(){
    this.getEtudiantByCne();
    this.getModuleNId();
    this.getSingleNote();
  }
}
