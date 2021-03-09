import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpFetchService } from './../service/http-fetch.service';
import { API } from './../config/config';
import { MessageGridComponent } from '../view/message-grid/message-grid.component'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit {

  @ViewChild('message-grid') public child: MessageGridComponent;
  public addItems: boolean = false;
  public team: string;

  constructor(
    private router: Router,
    private http: HttpFetchService
  ) { }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigateByUrl('/');
  }

  // Even observable object, used to send information from parent to child pr subscription
  public eventsSubject: Subject<number> = new Subject<number>();

  // Uses our subscription service that talks to message-grid
  addSmallItem() {
    this.eventsSubject.next(1);
  }

  // Uses our subscription service that talks to message-grid
  addLargeItem() {
    this.eventsSubject.next(2);
  }

  // Show hide Large and Small buttons.
  public addGrid() {
    this.addItems = !this.addItems;
  }

  // Just want to have the users team in localStorage, was properly not the best way to do this. 
  async ngOnInit() {
    await this.http.post(API.get_users_team, { 'msg': localStorage.getItem('user') }).subscribe((res) => {
      this.team = JSON.parse(res['msg']).team;
      localStorage.setItem('team', this.team);
    });
    console.log('USE THIS TOKEN FOR POSTMAN => ', `Bearer ${localStorage.getItem('token')}`);
  }

}
