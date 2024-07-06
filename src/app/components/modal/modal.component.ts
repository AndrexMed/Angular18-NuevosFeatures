import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ContactsService } from '@features/contacts/contacts.service';
import { ModalService } from './modal.service';
import { APP_CONSTANTS } from '@shared/constants';

const MATERIAL_MODULES = [
  MatInput,
  MatLabel,
  MatFormField,
  MatDialogModule,
  MatButton,
];
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MATERIAL_MODULES, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  title = 'Contact Form';
  contactForm!: FormGroup;
  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private readonly _contactSvc = inject(ContactsService);
  private readonly _modalSvc = inject(ModalService);

  ngOnInit(): void {
    this._buildForm();
    if (this._matDialog.isEditing) {
      this.contactForm.patchValue(this._matDialog.data);
      this._disabledForm();
    }
  }

  getTittle(): string {
    return this._matDialog.data ? 'Edit Contact' : 'Add Contact';
  }

  async onSubmit(): Promise<void> {
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;
    let contact = this.contactForm.value;
    if (this._matDialog.data) {
      this._contactSvc.updateContact(this._matDialog.data.id, contact);
    } else {
      await this._contactSvc.newContact(contact);
      message = APP_CONSTANTS.MESSAGES.CONTACT_ADDED;
    }

    //Show Snackbar
    this._modalSvc.closeModal();
  }

  private _buildForm(): void {
    this.contactForm = this._fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  private _disabledForm(): void {
    this.contactForm.disable();
  }
}
