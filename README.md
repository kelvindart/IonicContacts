# Ionic Contacts

This is a small app written in Ionic by myself (Kelvin Dart) to illustrate how to use Ionic to write a simple contacts application.

## Getting Started

At the time of writing this app, my environment is set up as follows:

```
cli packages: (/usr/local/lib/node_modules)

    @ionic/cli-utils  : 1.19.2
    ionic (Ionic CLI) : 3.20.0

global packages:

    cordova (Cordova CLI) : 8.0.0 

local packages:

    @ionic/app-scripts : 3.1.8
    Cordova Platforms  : none
    Ionic Framework    : ionic-angular 3.9.2

System:

    ios-deploy : 1.9.2 
    Node       : v9.11.1
    npm        : 5.6.0 
    OS         : macOS High Sierra
    Xcode      : Xcode 9.3 Build version 9E145 

Environment Variables:

    ANDROID_HOME : not set

Misc:

    backend : pro
```

## Installation
1. Ensure node is up-to-date as per the environment outlined above.
2. Clone this repo `git clone https://github.com/kelvindart/IonicContacts.git`
3. Run `npm install` from the project root to install all dependencies.
4. Run `ionic serve` from the project root to execute the project in a browser.
5. Enjoy!

# Future Considerations
If I was to spend more time on this project, there are a couple more things I would consider/implement.

## Persistent Storage
I would make use of [@ionic/storage](https://ionicframework.com/docs/storage/) to persist the contacts across sessions. 
This means your contact list will remain when quitting the app, and restarting it.

## Theming
I would alter the app to give it a bit of a better UI/UX. I have used some Ionic components to support how the app
should function, and provided some validation helpers to give the user feedback, but the app is still very much "Ionic"
right now.

## Data Structure
The `Contact` interface is pretty flat right now. I would enhance the address field into its own property, so the interface would go from:

```typescript
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
```

To

```typescript
export interface Contact {
  firstname: string;
  lastname: string;
  address: {
    address1: string;
    address2: string;
    town: string;
    county: string;
    postcode: string;
  }
  telephone: string;
  email: string;
}
```

I would then change the FormGroup in `add-contact.ts` to reflect this, as follows:

```typescript
this.contactGroup = this.fb.group({
  firstname: [ firstname, Validators.required ],
  lastname: [ lastname, Validators.required ],
  address: this.fb.group({
    address1: [ address1, Validators.required ],
    address2: [ address2 ], // address 2 is optional
    town: [ town, Validators.required ],
    county: [ county, Validators.required ],
    postcode: [ postcode, Validators.required ],
  }),
  telephone: [ telephone, Validators.required ],
  email: [ email, Validators.email ]
});
```

And make the necessary changes so the view reflects the model.
