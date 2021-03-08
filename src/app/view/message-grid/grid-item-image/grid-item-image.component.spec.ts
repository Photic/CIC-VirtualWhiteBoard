import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridItemImageComponent } from './grid-item-image.component';

describe('GridItemImageComponent', () => {
  let component: GridItemImageComponent;
  let fixture: ComponentFixture<GridItemImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridItemImageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
