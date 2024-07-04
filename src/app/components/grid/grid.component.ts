import {
  Component,
  effect,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInput } from '@angular/material/input';
import { FilterComponent } from './filter/filter.component';

const MATERIAL_MODULES = [MatTableModule, MatSortModule, MatPaginatorModule];
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES, FilterComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent<T> implements OnInit {
  displayedColumns = input.required<string[]>();
  data = input.required<T[]>();
  dataSource = new MatTableDataSource<T>();
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);

  valueToFilter = signal('');

  constructor() {
    effect(
      () => {
        if (this.valueToFilter()) {
          this.dataSource.filter = this.valueToFilter();
        } else {
          this.dataSource.filter = '';
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }
  ngOnInit(): void {
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
