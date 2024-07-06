import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from '@features/contacts/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly _dialog = inject(MatDialog);
  constructor() {}

  openModal<CT, T = Contact>(
    componentRef: ComponentType<CT>,
    data?: T,
    isEditing = false
  ): void {
    const appConfig = {
      data,
      isEditing
    };

    this._dialog.open(componentRef, {
      data: appConfig,
      width: '600px',
    });
  }

  closeModal(): void {
    this._dialog.closeAll();
  }
}
