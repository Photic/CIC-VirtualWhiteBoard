import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


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

  @Input() public item: any;
  @Output() public event = new EventEmitter();

  constructor() { }

  public edit() {

  }

  public delete() {

  }

  ngOnInit(): void {
    this.title = this.item.title;
    this.subtitle = this.item.team;
    this.imageUrl = this.item.picture;
    this.body = this.item.body;
    
    console.log(this.item.body);
    
    if (localStorage.getItem('team').includes(this.item.team) || localStorage.getItem('team').includes(localStorage.getItem('user'))) {
      this.disabled = false;
    } else if (this.item.team === undefined) {
      this.disabled = false;
    }
  }

}
