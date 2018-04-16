import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertController, IonicPage, NavParams, ViewController } from 'ionic-angular';

import { AddContactData, Contact } from '../../interfaces/contact';

@IonicPage()
@Component({
  selector: 'page-add-contact',
  templateUrl: 'add-contact.html',
})
export class AddContactPage {

  private submitting: boolean = false;

  /**
   * Instance of the contact group.
   */
  contactGroup: FormGroup;

  /**
   * Button label to represent adding/updating a contact.
   */
  btnLbl: string = 'Add';

  /**
   * Title label to represent adding/updating a contact.
   */
  titleLbl: string = 'Add Contact';

  /**
   * Existing contact - tracks whether we are adding/updating a contact.
   */
  existingContact: Contact;

  /**
   * Control reference to the firstname control.
   */
  get firstNameCtrl(): AbstractControl {
    return this.contactGroup.get('firstname');
  }

  /**
   * Control reference to the lastname control.
   */
  get lastNameCtrl(): AbstractControl {
    return this.contactGroup.get('lastname');
  }

  /**
   * Control reference to the address1 control.
   */
  get address1Ctrl(): AbstractControl {
    return this.contactGroup.get('address1');
  }

  /**
   * Control reference to the address2 control.
   */
  get address2Ctrl(): AbstractControl {
    return this.contactGroup.get('address2');
  }

  /**
   * Control reference to the town/city control.
   */
  get townCtrl(): AbstractControl {
    return this.contactGroup.get('town');
  }

  /**
   * Control reference to the county control.
   */
  get countyCtrl(): AbstractControl {
    return this.contactGroup.get('county');
  }

  /**
   * Control reference to the post code control.
   */
  get postCodeCtrl(): AbstractControl {
    return this.contactGroup.get('postcode');
  }

  /**
   * Control reference to the telephone control.
   */
  get telephoneCtrl(): AbstractControl {
    return this.contactGroup.get('telephone');
  }

  /**
   * Control reference to the email control.
   */
  get emailCtrl(): AbstractControl {
    return this.contactGroup.get('email');
  }

  constructor(
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private navParams: NavParams,
    private viewCtrl: ViewController,
  ) {
    this.existingContact = this.navParams.get('contact');

    if (this.existingContact) {
      this.btnLbl = 'Update';
      this.titleLbl = 'Edit Contact'
    }
  }

  /**
   * Initialise the form group, with existing values if a contact is being updated.
   */
  ngOnInit() {
    let firstname = this.existingContact ? this.existingContact.firstname : '';
    let lastname = this.existingContact ? this.existingContact.lastname : '';
    let address1 = this.existingContact ? this.existingContact.address1 : '';
    let address2 = this.existingContact ? this.existingContact.address2 : '';
    let town = this.existingContact ? this.existingContact.town : '';
    let county = this.existingContact ? this.existingContact.county : '';
    let postcode = this.existingContact ? this.existingContact.postcode : '';
    let telephone = this.existingContact ? this.existingContact.telephone : '';
    let email = this.existingContact ? this.existingContact.email : '';

    this.contactGroup = this.fb.group({
      firstname: [ firstname, Validators.required ],
      lastname: [ lastname, Validators.required ],
      address1: [ address1, Validators.required ],
      address2: [ address2 ], // address 2 is optional
      town: [ town, Validators.required ],
      county: [ county, Validators.required ],
      postcode: [ postcode, Validators.required ],
      telephone: [ telephone, Validators.required ],
      email: [ email, Validators.email ]
    });
  }

  ionViewCanLeave() {
    // if the form is pristine (unedited) or a user is submitted, then proceed
    if (this.contactGroup.pristine || this.submitting) return true;

    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: 'Discard Changes',
        message: 'Do you want to quit without saving your changes?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              alert.dismiss().then(reject);
              return false;
            }
          },
          {
            text: 'Yes',
            handler: () => {
              alert.dismiss().then(resolve);
              return false;
            }
          }
        ]
      });

      alert.present();
    });
  }

  /**
   * Attempt to add/edit a contact
   */
  updateContacts() {
    if (this.contactGroup.invalid) {
      // if the user tries to submit an add/edit to the contacts, and the form is deemed invalid
      // then mark each field as touched, which triggers the display of validation errors in the view.
      Object.keys(this.contactGroup.controls).forEach(name => this.contactGroup.controls[name].markAsTouched());
      return;
    }

    let newContact = <Contact>this.contactGroup.value;

    this.submitting = true;

    if (this.existingContact) {
      // merge the new data with the old
      this.existingContact.firstname = newContact.firstname;
      this.existingContact.lastname = newContact.lastname;
      this.existingContact.address1 = newContact.address1;
      this.existingContact.address2 = newContact.address2;
      this.existingContact.town = newContact.town;
      this.existingContact.county = newContact.county;
      this.existingContact.postcode = newContact.postcode;
      this.existingContact.telephone = newContact.telephone;
      this.existingContact.email = newContact.email;

      this.closeMe();
    }
    else {
      this.closeMe(newContact);
    }
  }

  /**
   * Closes the modal, and passes back a contact if there is one.
   * @param data
   */
  closeMe(contact?: Contact): Promise<any> {
    let data: AddContactData = { contact: contact, edited: !!(this.submitting && this.existingContact) };

    return this.viewCtrl.dismiss(data)
      .catch(err => console.error(err));
  }

}
