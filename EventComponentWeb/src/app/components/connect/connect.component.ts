import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  isAuthSubscription: Subscription | undefined;
  public isAuth: Boolean | null = false;

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (value) => (this.isAuth = value)
    );
  }

  ngOnDestroy(): void {
    this.isAuthSubscription?.unsubscribe();
  }

  onConnect(): void {
    this.isAuth = null;
    this.authService.ConnectAsync().then(
      () => {
        console.log('connected');
      },
      (e) => {
        console.error(e);
      }
    );
  }
}
