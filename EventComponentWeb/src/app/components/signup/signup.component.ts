import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  private isAuthSubscription: Subscription | undefined;
  isAuth: boolean | undefined = false;
  signupForm: FormGroup | any;

  ngOnInit(): void {
    this.InitIsAuthSubscription();
    this.InitForm();
  }

  InitForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
    this.isAuth = undefined;
    const email = this.signupForm?.get('email')?.value;
    const password = this.signupForm?.get('password')?.value;
    this.authService.SignupAsync(email, password).then(
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
