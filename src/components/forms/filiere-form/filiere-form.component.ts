import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { Toast } from 'primeng/toast';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-filiere-form',
  imports: [ReactiveFormsModule, Toast, FormsModule, NgFor ],
  templateUrl: './filiere-form.component.html',
  providers: [MessageService]
})
export class FiliereFormComponent {

  enseignants:any = [];
  intitule: string = "";
  alias: string = "";
  annee_accreditation: string = "";
  annee_fin_accreditation: string = "";
  id_cord: number = 0;

  //services
  messageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  //ngOnInit function
  ngOnInit(){
    this.getEnseigants();
  }

  getEnseigants(){
    this.httpService.getEnseignants().subscribe({
      next: (res) => this.enseignants = res
    })
  }

  creerFeliere(e: Event) {
    e.preventDefault();
    let data = {
      intitule: this.intitule,
      alias: this.alias,
      annee_accreditation: this.annee_accreditation,
      annee_fin_accreditation: this.annee_fin_accreditation
    }
    console.warn(data);
    this.httpService.creerFiliere(data, this.id_cord).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'succès', detail: "filiere a été créée avec succès", life: 2000 })
      },
      error: () => {
        this.messageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }
  reset(){
    this.intitule = "";
    this.alias = "";
    this.annee_accreditation = "";
    this.annee_fin_accreditation = "";
  }
}
