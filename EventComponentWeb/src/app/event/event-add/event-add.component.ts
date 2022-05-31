import { eventEntity } from './../models/evententity.model';
import { EventService } from './../services/events.service';
import { FirebaseService } from './../../firebase/services/firebase.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
  addEventForm: FormGroup | any;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addEventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      description: ['', [Validators.maxLength(200)]],
    });
  }

  onSubmit(): void {
    if (this.authService.userCredential?.user === undefined) {
      return;
    }
    var nexEvent = new eventEntity(
      '',
      this.addEventForm?.get('name')?.value,
      this.addEventForm?.get('description')?.value,
      this.addEventForm?.get('from')?.value,
      this.addEventForm?.get('to')?.value
    );
    this.eventService.createEventAsync(nexEvent);
  }
}
