import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FireBaseService } from './fire-base.service';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { eventEntity } from '../models/evententity.model';
import { ThisReceiver } from '@angular/compiler';
import { Unsubscribe } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(
    private fireBaseService: FireBaseService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isAuthSubject.subscribe((isAuth) => {

      console.log('stop listening events');
      this.reset();
      if (isAuth === true) {
        console.log('start listening events');
        this.startListening();
      }
    });
    this.authService.emitIsAuthSubject();
  }

  events: Map<string | null, eventEntity> = new Map<
    string | null,
    eventEntity
  >();
  eventAddedSub: Unsubscribe | undefined;
  eventRemovedSub: Unsubscribe | undefined;
  eventUpdatedSub: Unsubscribe | undefined;

  private startListening() {
    this.eventAddedSub = this.fireBaseService.OnChildAdded(
      this.getDatabaseReference(),
      (k, e) => {
        this.events.set(k, new eventEntity(e.name, e.date));
        this.emitEventsSubject();
      }
    );

    this.eventRemovedSub = this.fireBaseService.OnChildRemoved(
      this.getDatabaseReference(),
      (k, e) => {
        this.events.delete(k);
        this.emitEventsSubject();
      }
    );

    this.eventUpdatedSub = this.fireBaseService.OnChildChanged(
      this.getDatabaseReference(),
      (k, e) => {
        this.events.set(k, new eventEntity(e.name, e.date));
        this.emitEventsSubject();
      }
    );
  }
  public eventsSubject: Subject<eventEntity[]> = new Subject<eventEntity[]>();

  private reset() {
    this.eventAddedSub?.call(undefined);
    this.eventRemovedSub?.call(undefined);
    this.eventUpdatedSub?.call(undefined);
    this.events.clear();
  }

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
    return this.fireBaseService.GetDatabaseReference(`users/${this.authService.getConnectedUserId()}/events`);
  }
}
