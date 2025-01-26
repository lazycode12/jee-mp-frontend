import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-element-form',
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './element-form.component.html'
})
export class ElementFormComponent {

  constructor(private http : HttpClient){

  }
  fg = new FormGroup({
    titre : new FormControl(""),
    module : new FormControl("")
  })

  //services
  MessageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  creerElement(e: Event) {
    // console.warn(this.fg.value);
    e.preventDefault();
    this.httpService.creerMatiere(this.fg.value).subscribe({
      next: res => {
        this.MessageService.add({ severity: 'success', summary: 'succès', detail: 'La matière a été créée avec succès', life: 2000 })
        this.fg.reset();
      },
      error: err => {
        this.MessageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }
}
