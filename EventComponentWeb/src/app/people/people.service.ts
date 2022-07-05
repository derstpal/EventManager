import { Gender } from './models/gender.enum';
import { Diet } from './models/diet.enum';
import { DataSnapshot, query, Query } from 'firebase/database';
import { FirebaseService } from 'src/app/firebase/services/firebase.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, merge, Observable, takeUntil } from 'rxjs';
import { peopleEntity } from './models/peopleEntity';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(
    private fireBaseService: FirebaseService,
    public authService: AuthService,
    private router: Router
  ) {}

  private events: Map<string | null, peopleEntity> = new Map<
    string | null,
    peopleEntity
  >();

  createPeopleAsync(newPeople: peopleEntity): Promise<void> {
    if (this.authService.userCredential?.user === undefined) {
      return Promise.resolve();
    }
    var payload = {
      firstname: newPeople.firstName,
      lastname: newPeople.lastName,
      birthday: newPeople.birthDay.toISOString(),
      email : newPeople.email,
      diet: Diet[newPeople.diet],
      gender :Gender[newPeople.gender],
    };
    return this.fireBaseService
      .PushAsync(
        `users/${this.authService.getConnectedUserId()}/peoples`,
        payload
      )
      .then(() => {
        this.router.navigate(['peoples']);
      });
  }

  private getDatabaseReference(): Query {
    var ref = this.fireBaseService.GetDatabaseReference(
      `users/${this.authService.getConnectedUserId()}/peoples`
    );

    return query(ref);
  }

  OnPeopleAdded(): Observable<peopleEntity> {
    return this.fireBaseService
      .OnChildAdded(this.getDatabaseReference())
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, peopleEntity>(this.createPeopleFromSnapshot)
      );
  }

  OnPeopleRemoved(): Observable<peopleEntity> {
    return this.fireBaseService
      .OnChildRemoved(this.getDatabaseReference())
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, peopleEntity>(this.createPeopleFromSnapshot)
      );
  }

  OnPeopleChanged(): Observable<peopleEntity> {
    return this.fireBaseService
      .OnChildChanged(this.getDatabaseReference())
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, peopleEntity>(this.createPeopleFromSnapshot)
      );
  }

  OnPeopleList() {
    var events: peopleEntity[] = [];
    return merge(
      this.OnPeopleAdded().pipe(
        map((e) => {
          events.push(e);
          console.log(`${e.key} added`);
          return events;
        })
      ),
      this.OnPeopleChanged().pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events[index] = e;
          return events;
        })
      ),
      this.OnPeopleRemoved().pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events.splice(index, 1);
          return events;
        })
      )
    );
  }

  private createPeopleFromSnapshot(snapshot: DataSnapshot): peopleEntity {
    const e = snapshot.val();
    return new peopleEntity(
      snapshot.key ?? '',
      e.firstname,
      e.lastname,
      e.email,
      new Date(e.birthday),
      <Diet> e.diet,
      <Gender> e.gender,
    );
  }
}
