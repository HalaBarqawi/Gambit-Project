export class PreferenceNotFoundException extends Error {
    status: number;
    message: string;
  
    constructor() {
      super('Preference not found');
      this.status = 404;
      this.message = 'Preference not found';
    }
  }
  