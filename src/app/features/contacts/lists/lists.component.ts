import { Component, inject, OnInit } from '@angular/core';
import { GridComponent } from '@components/grid/grid.component';
import { ColumnKeys, Contact } from '../contact.interface';
import { ContactsService } from '../contacts.service';
import { tap } from 'rxjs';

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
    'action'
  ];
  sortableColumn: ColumnKeys<Contact> = [
    'id',
    'name',
    'email',
    'phone'
  ];

  private readonly _contactsService = inject(ContactsService);

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts() {
    this._contactsService
      .getAllContacts()
      .pipe(tap((contacts: Contact[]) => (this.data = [...contacts])))
      .subscribe();
  }
}
