import { signInWithEmailAndPassword } from 'firebase/auth';
import { FireBaseService } from './fire-base.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class AuthService {
  constructor(private fireBaseService: FireBaseService) {}

  public isAuth: Boolean | null = false;

  public isAuthSubject: Subject<Boolean | null> = new Subject<Boolean | null>();

  public SigninAsync(email: string, password: string) : Promise<boolean> {
    this.SetIsAuthSubject(null);
    console.log('connecting');

    return new Promise((resolve, reject) =>
      {
        this.fireBaseService.siginAsync(email, password).then(
          user => {
            this.SetIsAuthSubject(true);
            console.log('user ' + user.user.email + ' connected!');
            resolve(true);
          },
          (error) => {
            this.SetIsAuthSubject(false);
            reject(error);
          });
      });
  }

  public SignupAsync(email: string, password: string) : Promise<boolean> {
    this.SetIsAuthSubject(null);
    return new Promise((resolve, reject) =>
      {
        this.fireBaseService.createUserWithEmailAndPasswordAsync(email, password).then(
          user => {
            this.SetIsAuthSubject(true);
            console.log('user ' + user.user.email + ' is added!');
            resolve(true);
          },
          (error) => {
            this.SetIsAuthSubject(false);
            reject(error);
          });
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
