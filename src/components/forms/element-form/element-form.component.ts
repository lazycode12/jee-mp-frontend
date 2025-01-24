import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-element-form',
  imports: [ReactiveFormsModule],
  templateUrl: './element-form.component.html'
})
export class ElementFormComponent {

  constructor(private http : HttpClient){

  }
  fg = new FormGroup({
    titre : new FormControl(""),
    module : new FormControl("")
  })

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //services
  MessageService :  MessageService = inject( MessageService);

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.fg.value);
  }

  create(e: Event){
    e.preventDefault();
    this.http.post<any>("http://127.0.0.1:8000/api/resp", JSON.stringify(this.fg.value), {headers: this.headers})
      .subscribe({
        next: res => {
          this.MessageService.add({severity: 'success',summary: "succès", detail: res.message});
          this.fg.reset();
        },
        error: err => this.MessageService.add({severity: 'success',summary: "erreur", detail: err.error.message})
      })
  }

}
