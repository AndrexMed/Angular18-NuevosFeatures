import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [MatCardModule, ToolbarComponent];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MATERIAL_MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  ondAddNewContact() {
    console.log('Add new contact');
  }
}
