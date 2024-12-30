import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-root',
  imports: [DynamicFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chaapaar-task';
}
