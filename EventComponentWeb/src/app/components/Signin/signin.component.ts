import { Router, RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connect',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  private isAuthSubscription: Subscription | undefined;
  isAuth: Boolean | null = false;
  signupForm: FormGroup | any;

  ngOnInit(): void {
    this.InitIsAuthSubscription();
    this.InitForm();
  }

  InitForm() {
    this.signupForm = this.formBuilder.group({
      email: ['m@f.be', [Validators.required, Validators.email]],
      password: [
        'tessssssst',
        [Validators.required, Validators.pattern('[a-zA-Z0-9]{6,100}')],
      ],
    });
  }

  private InitIsAuthSubscription() {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (value) => (this.isAuth = value)
    );
    this.authService.emitIsAuthSubject();
  }

  ngOnDestroy(): void {
    this.isAuthSubscription?.unsubscribe();
  }

  onSubmit(): void {
    this.isAuth = null;
    const email = this.signupForm?.get('email')?.value;
    const password = this.signupForm?.get('password')?.value;
    this.authService.SigninAsync(email, password).then(
      () => {
        console.log('user ' + email + ' connected');
        this.router.navigate(['/events']);
      },
      (e) => {
        console.error(e);
      }
    );
  }
}
