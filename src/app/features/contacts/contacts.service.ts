import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { APP_CONSTANTS } from '@shared/constants';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { Contact } from './contact.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private readonly _firestore = inject(Firestore);
  private readonly _contactsCollection = collection(
    this._firestore,
    APP_CONSTANTS.COLLECTION_NAME
  );

  constructor() {}

  getAllContacts(): Observable<Contact[]> {
    const queryFn = query(this._contactsCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, { idField: 'id' }) as Observable<Contact[]>;
  }

  newContact(contact: Partial<Contact>) {
    return addDoc(this._contactsCollection, {
      created: Date.now(),
      updated: Date.now(),
      ...contact,
    });
  }

  async getContactById(id: string): Promise<Contact> {
    const docRef = this._getDocByRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as Contact;
  }

  updateContact(id: string, contact: Partial<Contact>): void {
    const docRef = this._getDocByRef(id);
    updateDoc(docRef, {
      ...contact,
      updated: Date.now(),
    });
  }

  deleteContact(id: string): void {
    const docRef = this._getDocByRef(id);
    deleteDoc(docRef);
  }

  private _getDocByRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
  }
}
