import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';
import {
  map,
  Subject,
  Observable,
  takeUntil,
  merge,
} from 'rxjs';
import { eventEntity } from '../models/evententity.model';
import { DataSnapshot } from 'firebase/database';
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

  public eventsSubject: Subject<eventEntity[]> = new Subject<eventEntity[]>();

  public emitEventsSubject() {
    this.eventsSubject.next(Array.from(this.events.values()));
  }

  createEventAsync(newEvent: eventEntity): Promise<void> {
    if (this.authService.userCredential?.user === undefined) {
      return Promise.resolve();
    }
    return this.fireBaseService.PushAsync('events', newEvent).then((key) => {
      this.router.navigate(['events']);
    });
  }

  private getDatabaseReference() {
    return this.fireBaseService.GetDatabaseReference(
      `users/${this.authService.getConnectedUserId()}/events`
    );
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
    //var events = new Map<string | null, eventEntity>();
    var events : eventEntity[] = [];
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
          var index = events.findIndex(e => e.key == e.key);
          events[index] = e;
          return events;
        })
      ),
      this.OnEventRemoved().pipe(
        map((e) => {
          var index = events.findIndex(e => e.key == e.key);
          events.splice(index, 1);
          return events;
        })
      )
    );
  }

  private createEventFromSnapshot(snapshot: DataSnapshot): eventEntity {
    const e = snapshot.val();
    return new eventEntity(snapshot.key? snapshot.key : '', e.name, e.description, new Date(e.from), new Date(e.to));
  }
}
