import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}
  message(message: string, options: Partial<AlertifyOptions>) {
    alertify[options.messageType](message);
    alertify.set('notifier', 'position', options.position);
    alertify.set('notifier', 'delay', options.delay);
  }
  dismiss() {
    alertify.dismissAll();
  }
}

export enum messageType {
  Error = 'error',
  Message = 'message',
  Notify = 'notify',
  Success = 'success',
  Warning = 'warning',
}
export enum position {
  TopCenter = 'top-center',
  TopRight = 'top-right',
  TopLeft = 'top-left',
  BottomCenter = 'bottom-center',
  BottomRight = 'bottom-right',
  BottomLeft = 'bottom-left',
}
export class AlertifyOptions {
  messageType: messageType = messageType.Success;
  position: position = position.BottomLeft;
  delay: number = 3;
}
