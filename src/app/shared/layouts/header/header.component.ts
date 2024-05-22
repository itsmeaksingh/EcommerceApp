import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, DoCheck {

  logged_in: boolean = false;
  language: string = "English";
  user_role!: string | any;

  private _router = inject(Router);
  constructor() {

  }

  ngDoCheck(): void {
    this.user_role = sessionStorage.getItem("role");
    const user_session_id = sessionStorage.getItem("user_session_id");
    if (user_session_id) {
      this.logged_in = true;
    }
  }

  logout() {
    sessionStorage.removeItem("user_session_id");
    sessionStorage.removeItem("role");
    this._router.navigateByUrl("/sign-in");
    location.reload();
  }

  ngOnInit(): void {
  }

}
