import {
  Component,
  effect,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from './filter/filter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { APP_CONSTANTS } from '@shared/constants';
import { ContactsService } from '@features/contacts/contacts.service';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';

const MATERIAL_MODULES = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
];
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
  private readonly _contactSvc = inject(ContactsService);
  private readonly _modalSvc = inject(ModalService);

  valueToFilter = signal('');
  sortableColumn = input<string[]>([]);

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

  openEditForm(data: T){
    this._modalSvc.openModal<ModalComponent, T>(ModalComponent, data, true);
  }
  deleteContact(id: string): void {
    const confirmation = confirm(APP_CONSTANTS.MESSAGES.CONFIRMATION);
    if (confirmation) {
      this._contactSvc.deleteContact(id);
    }
  }
}
