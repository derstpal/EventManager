import { PeopleModule } from './../people/people.module';
import { InviteService } from './services/invite.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteListComponent } from './components/invite-list/invite-list.component';
import { InviteListItemComponent } from './components/invite-list-item/invite-list-item.component';
import { InviteCreateComponent } from './components/invite-create/invite-create.component';
import { InviteComponent } from './components/invite/invite.component';

@NgModule({
  declarations: [InviteListComponent, InviteListItemComponent, InviteCreateComponent, InviteComponent],
  imports: [CommonModule, PeopleModule],
  providers: [InviteService],
})
export class InviteModule {}
