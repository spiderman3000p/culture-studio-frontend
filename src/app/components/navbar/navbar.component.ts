import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, tap } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from 'src/app/services/product/product.service';
import { HttpClientModule } from '@angular/common/http';

const MATERIAL = [
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
];

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    CommonModule,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MATERIAL,
  ],
})
export class NavbarComponent implements OnDestroy {
  sortedBy: Map<string, string> = new Map();
  private destroy$ = new Subject();

  constructor(private productService: ProductService) {}

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }

  sortBy(field: string, dir: 'asc' | 'desc'): void {
    this.sortedBy.set(field, dir);
  }

  onChangeSearch(event: any) {
    console.log('changed str', event.target.value);
    this.productService.productFilter$.next(event.target.value);
  }
}
