import { InviteService } from './../../services/invite.service';
import { map, Subscription, switchMap } from 'rxjs';
import { eventEntity } from 'src/app/event/models/evententity.model';
import { peopleEntity } from './../../../people/models/peopleEntity';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/event/services/events.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invite-create',
  templateUrl: './invite-create.component.html',
  styleUrls: ['./invite-create.component.scss']
})
export class InviteCreateComponent implements OnInit, OnDestroy {
  @Input() eventEntity?: eventEntity;
  selectedPeoples?: peopleEntity[];
  routeSub?: Subscription;
  eventSub?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private inviteService: InviteService,
    private eventEntityService: EventService,
    private location : Location
  ) {
    this.routeSub = this.route.parent?.params.subscribe((params) => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
    });

    this.eventSub = this.route.parent?.params
      .pipe(
        map((p) => p['id']),
        switchMap((id) => this.eventEntityService.getAsync(id))
      )
      .subscribe((o) => (this.eventEntity = o));
  }
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.eventSub?.unsubscribe();
  }

  ngOnInit(): void {}

  inviteAsync(): Promise<void> {
    if (this.selectedPeoples === undefined || this.eventEntity === undefined) {
      return Promise.resolve();
    }
    let event = this.eventEntity;
    return Promise.all(
      this.selectedPeoples.map((element) =>
        this.inviteService.InviteAsync(element, event)
      )
    ).then(() => {
      this.location.back();
    });
  }
}

