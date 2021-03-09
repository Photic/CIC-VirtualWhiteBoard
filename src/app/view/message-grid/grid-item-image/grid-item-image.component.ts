import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-grid-item-image',
  templateUrl: './grid-item-image.component.html',
  styleUrls: ['./grid-item-image.component.scss']
})
  
export class GridItemImageComponent implements OnInit {

  public title: String = "";
  public subtitle: String = "";
  public imageUrl: String = "";
  public body: String = "";
  public disabled: boolean = true;
  public safeURL: any;
  public imageOrVide: boolean = true;

  @Input() public item: any;
  @Output() public event = new EventEmitter();

  constructor(private sanitizer: DomSanitizer) {}

  /**
   * @description Would have been used to launch a new window with editing options
   */
  public edit() {

  }

  /**
   * @description Would have been used to straight up delete an element, given the right permissions.
   */
  public delete() {
    
  }

  /**
   * @description Handles the storing of data from the item object to local variables.
   * This is not necessary, just like the control I guess.
   */
  ngOnInit(): void {
    this.title = this.item.title;
    this.subtitle = this.item.team;
    this.imageUrl = this.item.picture;
    this.body = this.item.body;
    
    console.log(this.item.body);
    
    // My hackey way of insuring who can "edit" what, this is only a visual change atm.
    if (localStorage.getItem('team').includes(this.item.team) || localStorage.getItem('team').includes(localStorage.getItem('user'))) {
      this.disabled = false;
    } else if (this.item.team === undefined) {
      this.disabled = false;
    }

    if (this.item.picture != null && this.item.picture.includes('youtube')) {
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.picture);
      this.imageOrVide = false;
    }

    if (localStorage.getItem('team').includes('moderator')) {
      this.disabled = false;
    }
  }

}
