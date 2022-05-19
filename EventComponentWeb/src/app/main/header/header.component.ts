import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}

  isAuth: Boolean | undefined;
  isAuthSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (value) => {
        this.isAuth = value;
      }
    );
  }
  ngOnDestroy(): void {
    this.isAuthSubscription?.unsubscribe();
  }

  Signout() {
    this.authService.SignoutAsync().then(() => {
      this.router.navigate(['signin']);
    });
  }
}
