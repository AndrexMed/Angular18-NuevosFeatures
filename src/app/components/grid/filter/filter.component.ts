import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

const MATERIAL_MODULES = [MatFormFieldModule, MatLabel, MatInput, FormsModule];

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MATERIAL_MODULES],
  template: `
    <mat-form-field>
      <mat-label>{{ label() }}</mat-label>
      <input matInput [(ngModel)]="filter" [placeholder]="placeholder()" />
    </mat-form-field>
  `,
  styles: ``,
})
export class FilterComponent {
  filter = model('');
  label = input<string>('Filter');
  placeholder = input<string>('Search...');
}
