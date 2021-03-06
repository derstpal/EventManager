import { Diet } from '../models/diet.enum';
import { PeopleService } from './../people.service';
import { peopleEntity } from './../models/peopleEntity';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';
import { Gender } from '../models/gender.enum';

@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styleUrls: ['./people-add.component.scss'],
})
export class PeopleAddComponent implements OnInit {
  addPeopleForm: FormGroup | any;
  maxDate: Date = new Date();
  gender? : Gender;
  diet?: Diet;
  constructor(
    private peopleService: PeopleService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addPeopleForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.email]],
      birthday : [''],
    });
  }

  onSubmit(): void {
    if (this.authService.userCredential?.user === undefined) {
      return;
    }

    var people = new peopleEntity('',
      this.addPeopleForm?.get('firstname')?.value,
      this.addPeopleForm?.get('lastname')?.value,
      this.addPeopleForm?.get('email')?.value,
      this.addPeopleForm?.get('birthday')?.value,
      this.diet ?? Diet.none,
      this.gender ?? Gender.unknown,
    );

    this.peopleService.createPeopleAsync(people);
  }
}
