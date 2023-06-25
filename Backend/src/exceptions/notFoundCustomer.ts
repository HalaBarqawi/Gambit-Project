export class CustomerNotFoundException extends Error {
    status: number;
    message: string;
  
    constructor() {
      super('Customer not found');
      this.status = 404;
      this.message = 'Customer not found';
    }
  }
  