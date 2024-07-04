import { Routes } from '@angular/router';

const contactsRoute: Routes = [
    {
        path: 'contacts',
        loadComponent: () => import('./lists/lists.component').then(m => m.ListsComponent)
    }
];

export { contactsRoute }