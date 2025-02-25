import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { HttpService } from '../../../services/http.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-element-form',
  imports: [FormsModule, ToastModule, NgFor],
  templateUrl: './element-form.component.html',
  providers: [MessageService]
})
export class ElementFormComponent {

  modules: any = [];
  enseignants: any = [];
  titre: string = "";
  module_id: number = 0;
  enseignant_id: number = 0;

  constructor(private http : HttpClient){

  }

  //services
  messageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  getModules(){
    this.httpService.getModules().subscribe({
      next: (res) => this.modules = res
    });
  }

  getEnseignants(){
    this.httpService.getEnseignants().subscribe({
      next: (res) => this.enseignants = res
    });
  }

  creerElement(e: Event) {
    e.preventDefault();
    let data = {
      titre: this.titre
    }
    this.httpService.creerMatiere(data, this.module_id, this.enseignant_id).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: 'La matière a été créée avec succès', life: 2000 })
        this.titre = "";
      },
      error: err => {
        this.messageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }

  ngOnInit(){
    this.getModules();
    this.getEnseignants();
  }
}
