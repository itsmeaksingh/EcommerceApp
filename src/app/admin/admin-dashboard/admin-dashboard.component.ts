import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  public user_dashboard_data: any;
  public total_user: number = 0;
  public admin_user: number = 0;
  public seller_user: number = 0;
  public buyer_user: number = 0;

  public product_dashboard_data: any;
  public total_product: number = 0;
  public publish_product: number = 0;
  public inactive_product: number = 0;
  public draft_product: number = 0;

  private _router = inject(Router);
  private _adminService = inject(AdminService);

  constructor() {
  }

  ngOnInit(): void {
    this.adminProductDashboard();
    this.adminUserDashboardData()
  }
  userDashboard() {
    this._router.navigateByUrl("/admin/user");
  }
  productDashboard() {
    this._router.navigateByUrl("/admin/product")
  }
  adminUserDashboardData() {
    this._adminService.userDashboardData().subscribe({
      next: (data: any) => {
        this.user_dashboard_data = data;
        console.log(this.user_dashboard_data)
        for (let user in this.user_dashboard_data) {
          if (this.user_dashboard_data[user].role == 'admin') {
            ++this.admin_user;
          } else if (this.user_dashboard_data[user].role == 'seller') {
            ++this.seller_user;
          } else if (this.user_dashboard_data[user].role == 'buyer') {
            ++this.buyer_user;
          }
          ++this.total_user;
        }
      },
      error: (error) => {
        console.log("My error", error)
      }
    })
  }

  adminProductDashboard() {
    this._adminService.productDashboardData().subscribe({
      next: (data) => {
        this.product_dashboard_data = data;
        console.log(this.product_dashboard_data)
        for (let status in this.product_dashboard_data) {
          if (this.product_dashboard_data[status].status == 'publish') {
            ++this.publish_product;
          } else if (this.product_dashboard_data[status].status == 'inactive') {
            ++this.inactive_product;
          } else if (this.product_dashboard_data[status].status == 'draft') {
            ++this.draft_product
          }
          ++this.total_product;
        }
      }, error: (error) => {
        console.log("My error", error)
      }
    })
  }

}
