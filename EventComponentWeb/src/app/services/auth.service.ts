import { Subject } from "rxjs/internal/Subject";

export class AuthService {
  public isAuth = false;

  public isAuthSubject: Subject<Boolean> = new Subject<Boolean>();

  public Connect(): void {
    this.isAuth = true;
    this.emitIsAuthSubject();
  }

  public Disonnect(): void {
    this.isAuth = false;
    this.emitIsAuthSubject();
  }

  public emitIsAuthSubject() {
    this.isAuthSubject.next(this.isAuth);
  }
}
