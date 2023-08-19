import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  messageType,
  position,
} from 'src/app/services/admin/alertify.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}
  ngOnInit(): void {
    this.alertify.message('Merhaba Alertify', {
      messageType: messageType.Success,
      position: position.BottomLeft,
      delay: 5,
    });
  }

  // m(): void {

  // }
  // d(): void {
  //   this.alertify.dismiss();
  // }
}
