import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}
  message(
    message: string,
    title: string,
    toastroptions: Partial<ToastrOptions>
  ) {
    this.toastr[toastroptions.messageType](message, title, {
      positionClass: toastroptions.position,
    });
  }
}
export enum ToastrMessageType {
  Error = 'error',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
}
export enum ToastrPosition {
  TopCenter = 'toastr-top-center',
  TopRight = 'toastr-top-right',
  TopLeft = 'toastr-top-left',
  TopFullWidth = 'toastr-toastr-top-left',
  BottomCenter = 'toastr-bottom-center',
  BottomRight = 'toastr-bottom-right',
  BottomLeft = 'toastr-bottom-left',
  BottomFullWidth = 'toastr-bottom-left',
}
export class ToastrOptions {
  messageType: ToastrMessageType = ToastrMessageType.Success;
  position: ToastrPosition = ToastrPosition.TopRight;
}
