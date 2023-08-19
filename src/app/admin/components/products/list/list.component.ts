import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { list_product } from 'src/app/contracts/list_product';
import {
  AlertifyService,
  messageType,
  position,
} from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }
  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'delete',
    'edit',
  ];
  dataSource: MatTableDataSource<list_product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.BallClipRotate);
    const allProducts: { totalCount: number; products: list_product[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallClipRotate),
        (errorMessage) =>
          this.alertify.message(errorMessage, {
            messageType: messageType.Error,
            position: position.TopRight,
          })
      );
    this.dataSource = new MatTableDataSource<list_product>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }
}
