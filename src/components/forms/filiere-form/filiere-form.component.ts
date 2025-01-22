import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filiere-form',
  imports: [ReactiveFormsModule ],
  templateUrl: './filiere-form.component.html',
  styleUrl: './filiere-form.component.css'
})
export class FiliereFormComponent {

  fg = new FormGroup({
    intitule : new FormControl(""),
    alias : new FormControl(""),
    annee_accreditation: new FormControl(""),
    annee_fin_accreditation : new FormControl("")
  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.fg.value);
  }
}
