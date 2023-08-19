import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { create_product } from '../../../../contracts/create_product';
import {
  AlertifyService,
  messageType,
  position,
} from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spiner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spiner);
  }

  ngOnInit(): void {}

  @Output() createdProduct: EventEmitter<create_product> = new EventEmitter();

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallClipRotate);
    const createproduct: create_product = new create_product();
    createproduct.name = name.value;
    createproduct.stock = parseInt(stock.value);
    createproduct.price = parseFloat(price.value);

    this.productService.create(
      createproduct,
      () => {
        this.hideSpinner(SpinnerType.BallClipRotate);
        this.alertify.message('Ürün başarıyla eklenmiştir.', {
          messageType: messageType.Success,
          position: position.TopRight,
        });
        this.createdProduct.emit(createproduct);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          messageType: messageType.Error,
          position: position.TopRight,
        });
      }
    );
  }
}
