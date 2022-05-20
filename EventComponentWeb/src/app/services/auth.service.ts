import { UserCredential } from 'firebase/auth';
import { FireBaseService } from './fire-base.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private fireBaseService: FireBaseService) {}

  public isAuth: boolean | undefined = false;
  public userCredential: UserCredential | undefined;

  public isAuthSubject: Subject<boolean | undefined> = new Subject<
    boolean | undefined
  >();

  public SigninAsync(email: string, password: string): Promise<boolean> {
    this.SetIsAuthSubject(undefined);
    console.log('connecting');
    return new Promise((resolve, reject) => {
      this.fireBaseService.SigninAsync(email, password).then(
        (user) => {
          this.userCredential = user;
          this.SetIsAuthSubject(true);
          console.log('user ' + user.user.email + ' connected!');
          resolve(true);
        },
        (error) => {
          this.SetIsAuthSubject(false);
          reject(error);
        }
      );
    });
  }

  public SignupAsync(email: string, password: string): Promise<boolean> {
    this.SetIsAuthSubject(undefined);
    return new Promise((resolve, reject) => {
      this.fireBaseService
        .CreateUserWithEmailAndPasswordAsync(email, password)
        .then(
          (user) => {
            this.userCredential = user;
            this.SetIsAuthSubject(true);
            console.log('user ' + user.user.email + ' is added!');
            resolve(true);
          },
          (error) => {
            this.userCredential = undefined;
            this.SetIsAuthSubject(false);
            reject(error);
          }
        );
    });
  }

  public SignoutAsync(): Promise<void> {
    this.SetIsAuthSubject(undefined);
    return new Promise((resolve, reject) => {
      this.fireBaseService.SignoutAsync().then(
        () => {
          this.SetIsAuthSubject(false);
          this.userCredential = undefined;
          console.log('user disconnected!');
          resolve();
        },
        (error) => {
          this.SetIsAuthSubject(false);
          this.userCredential = undefined;
          reject(error);
        }
      );
    });
  }

  public emitIsAuthSubject() {
    this.isAuthSubject.next(this.isAuth);
  }

  private SetIsAuthSubject(value: boolean | undefined): void {
    this.isAuth = value;
    this.emitIsAuthSubject();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.isAuth === true;
  }

  public getConnectedUserId(): string | undefined {
    return this.userCredential?.user?.uid;
  }
}
