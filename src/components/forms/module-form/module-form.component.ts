import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpService } from '../../../services/http.service';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-module-form',
  imports: [ReactiveFormsModule, Toast ],
  templateUrl: './module-form.component.html'
})
export class ModuleFormComponent {
  fg = new FormGroup({
    titre : new FormControl(""),
    code : new FormControl(""),
    enseignant : new FormControl(""),
    niveau : new FormControl("")
  })

  //services
  MessageService :  MessageService = inject( MessageService);
  httpService: HttpService = inject(HttpService);

  creerModule(e: Event) {
    // console.warn(this.fg.value);
    e.preventDefault();
    this.httpService.creerModule(this.fg.value).subscribe({
      next: res => {
        this.MessageService.add({ severity: 'success', summary: 'succès', detail: 'Le module a été créée avec succès', life: 2000 })
        this.fg.reset();
      },
      error: err => {
        this.MessageService.add({ severity: 'danger', summary: 'erreur', detail: "quelque chose s'est mal passé", life: 2000 })
      }
    })
  }
}
