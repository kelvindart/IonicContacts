import { Component } from '@angular/core';

import { AlertController, ModalController, ToastController } from 'ionic-angular';

import { ContactsProvider } from '../../providers/contacts/contacts';

import { AddContactPage } from '../add-contact/add-contact';

import { AddContactData, Contact } from '../../interfaces/contact';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {

  public contacts: Contact[];

  constructor(
    private alertCtrl: AlertController,
    private contact: ContactsProvider,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
  ) {
    this.contacts = contact.contacts;
  }

  /**
   * Display the contact add page. If a contact is provided, assume we are editing a contact, otherwise we are adding a
   * new contact. If there is data returned from the modal, treat it as a new contact.
   */
  openContact(contact?: any): Promise<any> {
    let modal = this.modalCtrl.create(AddContactPage, contact ? { contact: contact } : undefined);

    modal.onDidDismiss((data: AddContactData) => {
      if (data.contact) {
        // if a new contact was added, add it to the global list
        return this.contact.addContact(data.contact);
      }

      if (data.edited) {
        // apply a sort, if a contact has been edited
        return this.contact.sortContacts();
      }
    });

    return modal.present();
  }

  /**
   * Ask the user if they want to delete a contact, and remove it if they do.
   */
  deleteContact(contact: Contact): Promise<any> {
    return this.confirmDelete()
      .then(() => this.contact.deleteContact(contact))
      .catch(() => {
        let toast = this.toastCtrl.create({
          message: 'Unable to delete contact. Please try again.',
          duration: 3000
        });

        return toast.present();
      });
  }

  /**
   * Display an alert, prompting the user to confirm removal.
   */
  private confirmDelete(): Promise<any> {
    return new Promise(resolve => {
      let alert = this.alertCtrl.create({
        title: 'Delete Contact',
        message: 'Do you want to delete this contact?',
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Yes',
            handler: () => {
              alert.dismiss().then(() => resolve(true));
              return false;
            }
          }
        ]
      });

      alert.present();
    });
  }

}
