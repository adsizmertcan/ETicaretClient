import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { create_product } from '../../../contracts/create_product';
import { HttpClientService } from '../http-client.service';
import { list_product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: create_product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: list_product[] }> {
    const promiseData: Promise<{
      totalCount: number;
      products: list_product[];
    }> = this.httpClientService
      .get<{ totalCount: number; products: list_product[] }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
      .toPromise();

    promiseData
      .then((d) => successCallBack)
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>(
        {
          controller: 'products',
        },
        id
      );
    await firstValueFrom(deleteObservable);
  }
}
