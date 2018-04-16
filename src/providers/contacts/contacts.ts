import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Contact } from '../../interfaces/contact';

@Injectable()
export class ContactsProvider {

  private _contacts: Contact[] = [];

  /**
   * Get the local instance of the contacts array.
   */
  get contacts(): Contact[] {
    return this._contacts;
  }

  constructor() {}

  /**
   * Add a given contact to the contacts list.
   * @param {Contact} contact
   */
  addContact(contact: Contact) {
    this._contacts.push(contact);
    this.sortContacts();
  }

  /**
   *
   */
  sortContacts() {
    this._contacts.sort((a, b) => {
      if (a.lastname < b.lastname) return -1;
      if (a.lastname > b.lastname) return 1;
      return 0;
    })
  }

  /**
   * Find the given contact in the array, and remove it.
   * @param {Contact} contact The contact to remove.
   * @throws {RangeError} Throws an error if the given contact cannot be found.
   */
  deleteContact(contact: Contact) {
    let i = this._contacts.indexOf(contact);

    if (i < 0) {
      throw new RangeError('');
    }

    this._contacts.splice(i, 1);
  }

  /**
   * Reset the array to empty.
   */
  clear() {
    this.contacts.length = 0;
  }

}
