import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class AuthService {
  public isAuth: Boolean | null = false;

  public isAuthSubject: Subject<Boolean | null> = new Subject<Boolean | null>();

  public SigninAsync(email: string, password: string) {
    this.SetIsAuthSubject(null);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
        this.SetIsAuthSubject(true);
      }, 1000);
    });
  }

  public Disonnect(): void {
    this.SetIsAuthSubject(false);
  }

  public emitIsAuthSubject() {
    this.isAuthSubject.next(this.isAuth);
  }

  private SetIsAuthSubject(value: Boolean | null): void {
    this.isAuth = value;
    this.emitIsAuthSubject();
  }
}
