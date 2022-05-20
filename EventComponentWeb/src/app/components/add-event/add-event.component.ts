import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FireBaseService } from './../../services/fire-base.service';
import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { eventEntity } from 'src/app/models/evententity.model';

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
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.authService.userCredential?.user === undefined) {
      return;
    }

    const name = this.addEventForm?.get('name')?.value;
    const date = this.addEventForm?.get('date')?.value;

    const newEvent = new eventEntity(name, date);

    this.fireBaseService.PushAsync(`users/${this.authService.getConnectedUserId()}/events`, newEvent).then(() => {
      this.router.navigate(['events']);
    });
  }
}
