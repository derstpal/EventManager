import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styleUrls: ['./people-add.component.scss'],
})
export class PeopleAddComponent implements OnInit {
  addPeopleForm: FormGroup | any;

  constructor(
    private fireBaseService: FirebaseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addPeopleForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.authService.userCredential?.user === undefined) {
      return;
    }
    var payload = {
      firstname: this.addPeopleForm?.get('firstname')?.value,
      lastname: this.addPeopleForm?.get('lastname')?.value,
      email: this.addPeopleForm?.get('email')?.value,
    };

    this.fireBaseService
      .PushAsync(
        `users/${this.authService.getConnectedUserId()}/peoples`,
        payload
      )
      .then(() => {
        this.router.navigate(['peoples']);
      });
  }
}
