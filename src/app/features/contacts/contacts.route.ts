import { Routes } from '@angular/router';

const contactsRoute: Routes = [
    {
        path: '',
        loadComponent: () => import('./lists/lists.component').then(m => m.ListsComponent)
    }
];

export { contactsRoute }