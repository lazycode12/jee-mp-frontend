import { HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //headers
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  //services
  authService: AuthService = inject(AuthService);

  fg = new FormGroup({
    login : new FormControl(""),
    password : new FormControl("")
  })

  login(e: Event){
    e.preventDefault();
    this.authService.login(this.fg.value).subscribe({
      next: () => {
        this.authService.getAuthenticatedUser()

      }
    })
  }

}
