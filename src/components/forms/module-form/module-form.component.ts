import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { Toast } from 'primeng/toast';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-module-form',
  imports: [FormsModule, Toast, NgFor],
  templateUrl: './module-form.component.html',
  providers: [MessageService]
})
export class ModuleFormComponent {
  resps: any = [];
  niveaux: any = [];
  titre: string = "";
  code: string = "";
  id_resp: number = 0;
  id_niveau:number = 0;

  //services
  MessageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  creerModule(e: Event) {
    // console.warn(this.fg.value);
    let data : any = {
      code: this.code,
      titre: this.titre
    }
    e.preventDefault();
    this.httpService.creerModule(data, this.id_niveau ,this.id_resp).subscribe({
      next: res => {
        this.MessageService.add({ severity: 'success', summary: 'succès', detail: 'Le module a été créée avec succès', life: 2000 })
      },
      error: err => {
        this.MessageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }

  getResps(){
    this.httpService.getEnseignants().subscribe({
      next: (res) => this.resps = res
    });
  }

  getNiveaux(){
    this.httpService.getNiveaux().subscribe({
      next: (res) => this.niveaux = res
    });
  }

  ngOnInit(){
    this.getResps();
    this.getNiveaux();
  }
}
