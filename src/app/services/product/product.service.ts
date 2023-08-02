import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productFilter$ = new BehaviorSubject('');
  private _products$ = new BehaviorSubject<Product[]>([]);
  products$ = this._products$.asObservable();
  constructor(private toast: MatSnackBar, private httpClient: HttpClient) {
    this.productFilter$
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        tap((filterStr: string) =>
          console.log(`fetching products with filter: ${filterStr}...`)
        ),
        switchMap((filter: string) => this.getProducts(filter)),
        tap((res) => this._products$.next(res))
      )
      .subscribe();
  }

  getProduct(product: Product): Observable<Product> {
    return this.httpClient.get<Product>(
      environment.api.baseUrl + environment.api.endpoints.product(product.id)
    );
  }

  deleteProduct(product: Product): Observable<void> {
    return this.httpClient.delete<void>(
      environment.api.baseUrl + environment.api.endpoints.product(product.id)
    );
  }

  updateProduct(product: Product): Observable<void> {
    return this.httpClient.put<void>(
      environment.api.baseUrl + environment.api.endpoints.product(product.id),
      product
    );
  }

  patchProduct(product: Product): Observable<void> {
    return this.httpClient.patch<void>(
      environment.api.baseUrl + environment.api.endpoints.product(product.id),
      product
    );
  }

  createProduct(product: Product): Observable<void> {
    return this.httpClient.post<void>(
      environment.api.baseUrl + environment.api.endpoints.products,
      product
    );
  }

  getProducts(filterStr?: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      environment.api.baseUrl + environment.api.endpoints.products,
      filterStr
        ? {
            params: {
              filter: filterStr,
            },
          }
        : {}
    );
  }
}
