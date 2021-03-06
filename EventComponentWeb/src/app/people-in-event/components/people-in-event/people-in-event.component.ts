import { InviteService } from './../../../invite/services/invite.service';
import { peopleEntity } from './../../../people/models/peopleEntity';
import { PeopleService } from './../../../people/people.service';
import { PeopleInEventService } from './../../services/people-in-event.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, switchMap, Observable, distinct } from 'rxjs';

@Component({
  selector: 'app-people-in-event',
  templateUrl: './people-in-event.component.html',
  styleUrls: ['./people-in-event.component.scss'],
})
export class PeopleInEventComponent implements OnInit, OnDestroy {
  @ViewChild('closebutton') closeButton: ElementRef | undefined;
  private routeSub: Subscription;
  invited$: Observable<peopleEntity[]>;

  constructor(private route: ActivatedRoute, private peopleService : PeopleService, private inviteService: InviteService) {
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
    });

    this.invited$ = this.route.params.pipe(map(p => p['id']),
    switchMap(id => this.inviteService.OnInviteList(id)),
    switchMap(invite => {
      var invited = invite.filter(e => e.invited === true).map(e => e.peopleKey);
      return this.peopleService.OnPeopleList().pipe(map(allpeoples => allpeoples.filter(all => invited.some(i => i === all.key))));
      }));
  }

  ngOnInit(): void {}

  public onSubRootDeactivate() {
    this.closeButton?.nativeElement.click();
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
