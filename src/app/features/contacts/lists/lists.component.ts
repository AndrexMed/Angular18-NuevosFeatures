import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { ColumnKeys, Contact } from '../contact.interface';
import { ContactsService } from '../contacts.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [GridComponent],
  template: `
    <section>
      @if(data.length > 0){
      <app-grid
        [displayedColumns]="displayedColumns"
        [data]="data"
        [sortableColumn]="sortableColumn"
      />
      }
    </section>
  `,
  styles: ``,
})
export class ListsComponent implements OnInit {
  data: Contact[] = [];
  displayedColumns: ColumnKeys<Contact> = [
    'id',
    'name',
    'email',
    'phone',
    'action',
  ];
  sortableColumn: ColumnKeys<Contact> = ['id', 'name', 'email', 'phone'];

  private readonly _contactsService = inject(ContactsService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this._contactsService
      .getAllContacts()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((contacts: Contact[]) => (this.data = [...contacts]))
      )
      .subscribe();
  }
}
