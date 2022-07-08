import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import { map, Subject, Observable, takeUntil, merge } from 'rxjs';
import { eventEntity } from '../models/evententity.model';
import { DataSnapshot, Query, query } from 'firebase/database';
import { FirebaseService } from 'src/app/firebase/services/firebase.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private fireBaseService: FirebaseService,
    public authService: AuthService,
    private router: Router
  ) {}

  private events: Map<string | null, eventEntity> = new Map<
    string | null,
    eventEntity
  >();

  createEventAsync(newEvent: eventEntity): Promise<void> {
    if (this.authService.userCredential?.user === undefined) {
      return Promise.resolve();
    }
    var payload = {
      name: newEvent.name,
      from: newEvent.from.toISOString(),
      to: newEvent.to.toISOString(),
      description: newEvent.description,
    };
    return this.fireBaseService
      .PushAsync(
        `users/${this.authService.getConnectedUserId()}/events`,
        payload
      )
      .then(() => {
        this.router.navigate(['events']);
      });
  }

  private getDatabaseReference(): Query {
    var ref = this.fireBaseService.GetDatabaseReference(
      `users/${this.authService.getConnectedUserId()}/events`
    );

    return query(ref);
  }

  OnEventAdded(): Observable<eventEntity> {
    return this.fireBaseService
      .OnChildAdded(this.getDatabaseReference())
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, eventEntity>(this.createEventFromSnapshot)
      );
  }

  OnEventRemoved(): Observable<eventEntity> {
    return this.fireBaseService
      .OnChildRemoved(this.getDatabaseReference())
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, eventEntity>(this.createEventFromSnapshot)
      );
  }

  OnEventChanged(): Observable<eventEntity> {
    return this.fireBaseService
      .OnChildChanged(this.getDatabaseReference())
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, eventEntity>(this.createEventFromSnapshot)
      );
  }

  OnEventList() {
    var events: eventEntity[] = [];
    return merge(
      this.OnEventAdded().pipe(
        map((e) => {
          events.push(e);
          console.log(`${e.key} added`);
          return events;
        })
      ),
      this.OnEventChanged().pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events[index] = e;
          return events;
        })
      ),
      this.OnEventRemoved().pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events.splice(index, 1);
          return events;
        })
      )
    );
  }

  private createEventFromSnapshot(snapshot: DataSnapshot): eventEntity {
    const e = snapshot.val();
    return new eventEntity(
      snapshot.key ?? '',
      e.name,
      e.description,
      new Date(e.from),
      new Date(e.to)
    );
  }

  getAsync(key: string): Promise<eventEntity> {
    return this.fireBaseService
      .GetAsync(
        this.fireBaseService.GetDatabaseReference(
          `users/${this.authService.getConnectedUserId()}/events/${key}`
        )
      )
      .then((r) => this.createEventFromSnapshot(r));
  }
}
