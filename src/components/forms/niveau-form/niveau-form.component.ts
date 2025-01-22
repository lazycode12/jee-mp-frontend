import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-niveau-form',
  imports: [ReactiveFormsModule ],
  templateUrl: './niveau-form.component.html',
  styleUrl: './niveau-form.component.css'
})
export class NiveauFormComponent {
  fg = new FormGroup({
    alias : new FormControl(""),
    filiere : new FormControl(""),
    niveau_suivante : new FormControl("")
  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.fg.value);
  }
}
