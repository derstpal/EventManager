import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './main/content/content.component';
import { HeaderComponent } from './main/header/header.component';
import { EventsComponent } from './components/events/events.component';
import { EventService } from './services/events.service';
import { EventlistitemComponent } from './components/eventlistitem/eventlistitem.component';
import { ConnectComponent } from './components/connect/connect.component';
import { AddEventComponent } from './components/add-event/add-event.component';

const appRoutes: Route[] = [
  { path: 'events', component: EventsComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'addEvent', component: ConnectComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    EventlistitemComponent,
    EventsComponent,
    ConnectComponent,
    AddEventComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(appRoutes)],
  providers: [EventService],
  bootstrap: [AppComponent],
})
export class AppModule {}
