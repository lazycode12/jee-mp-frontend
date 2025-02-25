import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { Toast } from 'primeng/toast';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-niveau-form',
  imports: [FormsModule, Toast, NgFor ],
  templateUrl: './niveau-form.component.html',
  providers: [MessageService]
})
export class NiveauFormComponent {

  filieres: any = [];
  niveaux: any = [];
  filiere_id: number = 0;
  id_niveau_suivant: number = 0;
  intitule: string = '';
  alias: string ='';
  //services
  MessageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  creerNiveau(e: Event) {
    let data: any = {
      intitule: this.intitule,
      alias: this.alias
    }
    e.preventDefault();

    if(this.id_niveau_suivant == 0){

      this.httpService.creerNiveau(data, this.filiere_id).subscribe({
        next: res => {
          this.MessageService.add({ severity: 'success', summary: 'succès', detail: 'Le niveau a été créée avec succès', life: 2000 })
          this.resetFields();
        },
        error: err => {
          this.MessageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
        }
      })
    }else{
      this.httpService.creerNiveau(data, this.filiere_id, this.id_niveau_suivant).subscribe({
        next: res => {
          this.MessageService.add({ severity: 'success', summary: 'succès', detail: 'Le niveau a été créée avec succès', life: 2000 })
          this.resetFields();
        },
        error: err => {
          this.MessageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
        }
      })
    }
  }

  resetFields(){
    this.alias = '';
    this.intitule = '';
    this.id_niveau_suivant = 0;
    this.filiere_id = 0;
  }

  getFilieres(){
    this.httpService.getFilieres().subscribe({
      next: (res) => this.filieres = res
    });
  }

  getNiveaux(){
    this.httpService.getNiveaux().subscribe({
      next: (res) => this.niveaux = res
    });
  }

  ngOnInit(){
    this.getFilieres();
    this.getNiveaux();
  }
}
