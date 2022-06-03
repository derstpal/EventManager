import { peopleInEventEntity } from './../models/peopleInEventEntity';
import { AuthService } from './../../services/auth.service';
import { peopleEntity } from './../../people/models/peopleEntity';
import { FirebaseService } from './../../firebase/services/firebase.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, merge, Observable, takeUntil } from 'rxjs';
import { query, Query, DataSnapshot } from 'firebase/database';
import { eventEntity } from 'src/app/event/models/evententity.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleInEventService {
  constructor(
    private fireBaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  public Invite(people: peopleEntity, event: eventEntity): Promise<void> {
    if (this.authService.userCredential?.user === undefined) {
      return Promise.resolve();
    }
    var payload = {
      peopleKey: people.key,
      invited : true,
    };
    return this.fireBaseService
      .PushAsync(
        `users/${this.authService.getConnectedUserId()}/peoplesInEvent/${
          event.key
        }`,
        payload
      )
      .then(() => {
        this.router.navigate(['peoplesInEvent']);
      });
  }
  private getDatabaseReference(eventKey : string): Query {
    var ref = this.fireBaseService.GetDatabaseReference(
      `users/${this.authService.getConnectedUserId()}/peoplesInEvent/${eventKey}`
    );

    return query(ref);
  }

  OnInvite(eventKey : string): Observable<peopleInEventEntity> {
    return this.fireBaseService
      .OnChildAdded(this.getDatabaseReference(eventKey))
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, peopleInEventEntity>(this.createEventFromSnapshot)
      );
  }

  OnUninvite(eventKey : string): Observable<peopleInEventEntity> {
    return this.fireBaseService
      .OnChildRemoved(this.getDatabaseReference(eventKey))
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, peopleInEventEntity>(this.createEventFromSnapshot)
      );
  }

  OnInviteChanged(eventKey : string): Observable<peopleInEventEntity> {
    return this.fireBaseService
      .OnChildChanged(this.getDatabaseReference(eventKey))
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, peopleInEventEntity>(this.createEventFromSnapshot)
      );
  }

  OnEventList(eventKey : string) {
    var events: peopleInEventEntity[] = [];
    return merge(
      this.OnInvite(eventKey).pipe(
        map((e) => {
          events.push(e);
          console.log(`${e.key} added`);
          return events;
        })
      ),
      this.OnInviteChanged(eventKey).pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events[index] = e;
          return events;
        })
      ),
      this.OnUninvite(eventKey).pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events.splice(index, 1);
          return events;
        })
      )
    );
  }

  private createEventFromSnapshot(snapshot: DataSnapshot): peopleInEventEntity {
    const e = snapshot.val();
    return new peopleInEventEntity(snapshot.key ?? '', e.peopleKey, e.invited);
  }
}
