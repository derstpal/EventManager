import { FirebaseService } from './../../firebase/services/firebase.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  addEventForm: FormGroup | any;

  constructor(
    private fireBaseService: FirebaseService,
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
