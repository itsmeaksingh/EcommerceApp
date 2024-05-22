import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.scss'
})
export class BuyerDashboardComponent implements OnInit {
  all_products: any;
  show_Checkout: boolean = false;

  private _router = inject(Router);
  private _customerService = inject(CustomerService);
  constructor() { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this._customerService.allProduct().subscribe({
      next: data => {
        this.all_products = data;
        console.log(this.all_products)
      }, error: error => {
        console.log("My error", error)
      }
    })
  }

  buyProduct(id: number) {
    this.show_Checkout = true;
    this._customerService.quickBuyProduct(id);
    this._router.navigateByUrl('/checkout');
  }
  addToCart() {
    alert("This is showcase")
  }
}
