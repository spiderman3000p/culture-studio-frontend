import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil, take } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from 'src/app/services/product/product.service';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [CurrencyPipe],
  imports: [
    CommonModule,
    MatBadgeModule,
    NgFor,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
  ],
})
export class ProductListComponent implements OnDestroy {
  products: Product[] = [];
  filters = {};
  private destroy$ = new Subject();

  constructor(
    private productService: ProductService,
    private currencyPipe: CurrencyPipe
  ) {
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.products = res;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  createProduct(product: Product) {
    this.productService.createProduct(product);
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe();
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe();
  }
}
