import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ManualComponent } from './manual/manual.component';
import { AutomaticComponent } from './automatic/automatic.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ManualComponent, AutomaticComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
