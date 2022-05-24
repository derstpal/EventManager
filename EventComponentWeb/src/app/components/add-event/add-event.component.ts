import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FireBaseService } from './../../services/fire-base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  addEventForm: FormGroup | any;

  constructor(
    private fireBaseService: FireBaseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addEventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      date: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
    });
  }

  onSubmit(): void {
    if (this.authService.userCredential?.user === undefined) {
      return;
    }

    this.fireBaseService
      .PushAsync(`users/${this.authService.getConnectedUserId()}/events`, {
        name: this.addEventForm?.get('name')?.value,
        date: this.addEventForm?.get('date')?.value,
        description: this.addEventForm?.get('description')?.value,
      })
      .then(() => {
        this.router.navigate(['events']);
      });
  }
}
