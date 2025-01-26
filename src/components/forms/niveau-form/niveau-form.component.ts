import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-niveau-form',
  imports: [ReactiveFormsModule, Toast ],
  templateUrl: './niveau-form.component.html'
})
export class NiveauFormComponent {
  fg = new FormGroup({
    alias : new FormControl(""),
    filiere : new FormControl(""),
    niveau_suivante : new FormControl("")
  })

  //services
  MessageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  creerNiveau(e: Event) {
    // console.warn(this.fg.value);
    e.preventDefault();
    this.httpService.creerNiveau(this.fg.value).subscribe({
      next: res => {
        this.MessageService.add({ severity: 'success', summary: 'succès', detail: 'Le niveau a été créée avec succès', life: 2000 })
        this.fg.reset();
      },
      error: err => {
        this.MessageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }
}
