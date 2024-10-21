export class Notification {
    constructor(message, sentAt, notificationType) {
        this.message = message;
        this.sentAt = new Date(sentAt); 
        this.notificationType = notificationType;
    }
}
