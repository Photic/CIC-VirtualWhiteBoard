import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompactType, DisplayGrid, GridsterItem, GridType } from 'angular-gridster2';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpFetchService } from 'src/app/service/http-fetch.service';
import { API } from '../../config/config';

@Component({
  selector: 'app-message-grid',
  templateUrl: './message-grid.component.html',
  styleUrls: ['./message-grid.component.scss']
})

export class MessageGridComponent implements OnInit, OnDestroy {

  public options;
  public whiteboard: Array<GridsterItem>;
  private eventsSubscription: Subscription;
  @Input() public events: Observable<number>;

  constructor(private fetch: HttpFetchService) { }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.whiteboard.splice(this.whiteboard.indexOf(item), 1);
  }

  private addItem(event): void {
    if (event === 1) {
      this.whiteboard.push({cols: 10, rows: 12, x: 0, y: 0});
    } else {
      this.whiteboard.push({cols: 20, rows: 24, x: 0, y: 0});
    }
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      console.log('resize');
      this.options.api.optionsChanged();
    }
  }

  eventHandler($event) {
    console.log($event);
  }

  async ngOnInit() {
    this.options = {
      gridType: GridType.Fixed,
      compactType: CompactType.CompactUpAndLeft,
      margin: 8,
      useTransformPositioning: true,
      mobileBreakpoint: 0,
      minCols: 32,
      maxCols: 128,
      minRows: 32,
      maxRows: 128,
      maxItemCols: 200,
      fixedRowHeight: 15,
      fixedColWidth: 15,
      minItemCols: 1,
      maxItemRows: 200,
      minItemRows: 1,
      maxItemArea: 21000,
      minItemArea: 1,
      defaultItemCols: 10,
      defaultItemRows: 10,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      disableScrollHorizontal: false,
      disableScrollVertical: false,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true
      },
      resizable: {
        enabled: false
      },
      swap: false,
      pushItems: false,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      disableAutoPositionOnConflict: false,
      scrollToNewItems: false
    };

    this.whiteboard = [];

    this.fetch.get(API.get_posts).subscribe((res) => {
      JSON.parse(res['msg']).forEach(element => {
        this.whiteboard.push(element);
      });
    });

    this.eventsSubscription = this.events.subscribe((event) => this.addItem(event));
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }
}
