import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //headers
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  fg = new FormGroup({
    login : new FormControl(""),
    password : new FormControl("")
  })

  login(e: Event){

  }
}
