import { Injectable } from '@angular/core';
import { query, orderByChild, equalTo, DataSnapshot, Query } from 'firebase/database';
import { Observable, takeUntil, map, merge } from 'rxjs';
import { eventEntity } from 'src/app/event/models/evententity.model';
import { FirebaseService } from 'src/app/firebase/services/firebase.service';
import { peopleEntity } from 'src/app/people/models/peopleEntity';
import { AuthService } from 'src/app/services/auth.service';
import { inviteEntity } from '../models/inviteEntity';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(
    private fireBaseService: FirebaseService,
    private authService: AuthService
  ) {}

  public InviteAsync(people: peopleEntity, event: eventEntity): Promise<void> {
    if (this.authService.userCredential?.user === undefined) {
      return Promise.resolve();
    }
    var path = this.GetReference(event.key);

    var updates = this.fireBaseService
      .FindAsync(
        query(
          this.fireBaseService.GetDatabaseReference(path),
          orderByChild('peopleKey'),
          equalTo(people.key)
        )
      )
      .then((r) =>
        Promise.all(
          r.map((e) => {
            var existingInvite = this.createInviteFromSnapshot(e);
            console.log(
              `people ${people.key} already invited. Updating Invitations ${existingInvite.key}`
            );
            return this.updateAsync(
              existingInvite.key,
              { invite: true },
              event
            );
          })
        )
      );

    return updates.then((updated) => {
      if (updated.length == 0) {
        var payload = {
          peopleKey: people.key,
          invited: true,
        };
        console.log(`people ${people.key} not yet invited. first Invitation`);
        this.fireBaseService.PushAsync(path, payload);
      }
    });
  }

  private GetReference = (inviteKey: string) =>
    `users/${this.authService.getConnectedUserId()}/invites/${inviteKey}`;

  private GetDatabaseReference(inviteKey: string): Query {
    var ref = this.fireBaseService.GetDatabaseReference(
      this.GetReference(inviteKey)
    );

    return query(ref);
  }

  OnInviteAdded(inviteKey: string): Observable<inviteEntity> {
    return this.fireBaseService
      .OnChildAdded(this.GetDatabaseReference(inviteKey))
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, inviteEntity>(this.createInviteFromSnapshot)
      );
  }

  OnInviteRemoved(inviteKey: string): Observable<inviteEntity> {
    return this.fireBaseService
      .OnChildRemoved(this.GetDatabaseReference(inviteKey))
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, inviteEntity>(this.createInviteFromSnapshot)
      );
  }

  OnInviteChanged(inviteKey: string): Observable<inviteEntity> {
    return this.fireBaseService
      .OnChildChanged(this.GetDatabaseReference(inviteKey))
      .pipe(
        takeUntil(this.authService.isAuthSubject.pipe(map((b) => !b))),
        map<DataSnapshot, inviteEntity>(this.createInviteFromSnapshot)
      );
  }

  OnInviteList(inviteKey: string) : Observable<inviteEntity[]> {
    var events: inviteEntity[] = [];
    return merge(
      this.OnInviteAdded(inviteKey).pipe(
        map((e) => {
          events.push(e);
          console.log(`${e.key} added`);
          return events;
        })
      ),
      this.OnInviteChanged(inviteKey).pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events[index] = e;
          return events;
        })
      ),
      this.OnInviteRemoved(inviteKey).pipe(
        map((e) => {
          var index = events.findIndex((e) => e.key == e.key);
          events.splice(index, 1);
          return events;
        })
      )
    );
  }

  private createInviteFromSnapshot(snapshot: DataSnapshot): inviteEntity {
    const e = snapshot.val();
    return new inviteEntity(snapshot.key ?? '', e.peopleKey, e.invited);
  }

  private updateAsync(inviteKey: string, updates: {}, event: eventEntity) {
    var path = this.GetReference(event.key) + `/${inviteKey}`;
    return this.fireBaseService.UpdateAsync(
      this.fireBaseService.GetDatabaseReference(path),
      updates
    );
  }
}
