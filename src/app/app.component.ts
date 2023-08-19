import { Component } from '@angular/core';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService: CustomToastrService) {
    toastrService.message('Merhaba', 'Gençay', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
    toastrService.message('hello', 'samet', {
      messageType: ToastrMessageType.Error,
      position: ToastrPosition.TopRight,
    });
  }
}
