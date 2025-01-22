import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-module-form',
  imports: [ReactiveFormsModule ],
  templateUrl: './module-form.component.html',
  styleUrl: './module-form.component.css'
})
export class ModuleFormComponent {
  fg = new FormGroup({
    titre : new FormControl(""),
    code : new FormControl(""),
    enseignant : new FormControl(""),
    niveau : new FormControl("")
  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.fg.value);
  }
}
