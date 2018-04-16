export interface Contact {
  firstname: string;
  lastname: string;
  address1: string;
  address2: string;
  town: string;
  county: string;
  postcode: string;
  telephone: string;
  email: string;
}

export interface AddContactData {
  contact: Contact;
  edited: boolean;
}
