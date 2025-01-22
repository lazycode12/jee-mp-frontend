import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-element-form',
  imports: [ReactiveFormsModule],
  templateUrl: './element-form.component.html',
  styleUrl: './element-form.component.css'
})
export class ElementFormComponent {
  fg = new FormGroup({
    titre : new FormControl(""),
    module : new FormControl("")
  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.fg.value);
  }

}
