import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-filiere-form',
  imports: [ReactiveFormsModule, Toast ],
  templateUrl: './filiere-form.component.html'
})
export class FiliereFormComponent {

  fg = new FormGroup({
    intitule : new FormControl(""),
    alias : new FormControl(""),
    annee_accreditation: new FormControl(""),
    annee_fin_accreditation : new FormControl("")
  })

  //services
  MessageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  creerFeliere(e: Event) {
    // console.warn(this.fg.value);
    e.preventDefault();
    this.httpService.creerFiliere(this.fg.value).subscribe({
      next: res => {
        this.MessageService.add({ severity: 'success', summary: 'succès', detail: 'Le filiere a été créée avec succès', life: 2000 })
        this.fg.reset();
      },
      error: err => {
        this.MessageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }
}
