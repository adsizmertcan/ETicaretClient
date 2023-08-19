import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomersComponent],
  imports: [
    CommonModule,
    //Öenemliii
    // www.ffff/admin/customers/x
    // RouterModule.forChild([{ path: '', component: CustomersComponent }]),

    RouterModule.forChild([{ path: '', component: CustomersComponent }]),
  ],
})
export class CustomersModule {}
