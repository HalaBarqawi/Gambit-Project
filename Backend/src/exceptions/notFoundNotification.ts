export class NotificationNotFoundException extends Error {
    status: number;
    message: string;
  
    constructor() {
      super('Notification not found');
      this.status = 404;
      this.message = 'Notification not found';
    }
  }
  